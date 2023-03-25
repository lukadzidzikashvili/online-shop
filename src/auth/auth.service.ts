import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { UsersDto } from './dto/user.register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import { JwtPayload } from './guards/jwt-payload.interface';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Users } from './entity/user.entity';
import { UserRoles } from 'src/roles/entity/role.entity';
import { UsersSigninDto } from './dto/user.signin.dto';
import { userTokens } from './entity/user.tokens.entity';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(UserRoles)
    private roleRepository: Repository<UserRoles>,
    @InjectRepository(userTokens)
    private tokensRepository: Repository<userTokens>,
    private jwtService: JwtService,
  ) {}

  async signUp(usersDto: UsersDto): Promise<object> {
    const { username, email, fullname, password, isActive } = usersDto;
    const role = await this.roleRepository.findOne({
      where: { id: usersDto.roleId || 3 },
    });
    const errorMsg = [];
    const checkUser = await this.usersRepository.findOne({
      where: { username },
    });
    const checkEmail = await this.usersRepository.findOne({ where: { email } });
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.usersRepository.create({
      username,
      email,
      fullname,
      password: hashedPassword,
      role: role,
      isActive,
    });
    try {
      await this.usersRepository.save(user);
      return {
        status: true,
        message: 'მომხმარებელი წარმატებით დარეგისტრირდა!',
      };
    } catch (error) {
      if (checkUser) {
        // დუბლირებული მომხმარებლის სახელი
        errorMsg.push('მომხმარებელი ამ სახელით უკვე არსებობს!');
      }
      if (checkEmail) {
        // დუბლირებული მომხმარებლის მეილი
        errorMsg.push('ასეთი მეილით მომხმარებელი უკვე არსებობს!');
      }
      if (errorMsg.length > 0) {
        throw new NotFoundException(errorMsg);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(
    usersSigninDto: UsersSigninDto,
    req: Request,
  ): Promise<{ accessToken: string }> {
    const { username, password } = usersSigninDto;
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);

      const token = await this.tokensRepository.findOne({
        where: { userId: user.id },
      });
      const ipAddress = await this.getUserIpAddress(req);
      if (token) {
        token.token = accessToken;
        token.userIp = ipAddress;
        token.startAt = new Date();
        token.expiresAt = new Date(Date.now() + 3 * 60 * 60 * 1000); // 3 საათი
        await this.tokensRepository.save(token);
      } else {
        const newToken = new userTokens();
        newToken.userId = user.id;
        newToken.userIp = ipAddress;
        newToken.token = accessToken;
        newToken.expiresAt = new Date(Date.now() + 3 * 60 * 60 * 1000);
        await this.tokensRepository.save(newToken);
      }
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        `გთხოვთ გადაამოწმოთ თქვენი ლოგინი და პაროლი!`,
      );
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async getUserIpAddress(req: Request): Promise<string> {
    try {
      const res = await axios.get('https://api.ipify.org?format=json');
      return res.data.ip;
    } catch (err) {
      console.error(err);
      return '::1';
    }
  }
  @Cron('* * 3 * * *')
  async deleteExpiredTokens() {
    const result = await this.tokensRepository.delete({
      expiresAt: LessThan(new Date()),
    });
    return console.log(result.affected);
  }
}
