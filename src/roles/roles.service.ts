import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UserRoles } from './entity/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(UserRoles)
    private roleRepository: Repository<UserRoles>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<object> {
    const { rolename } = createRoleDto;
    const validateError = [];
    const checkRole = await this.roleRepository.findOne({
      where: { rolename },
    });
    const role = this.roleRepository.create({
      rolename,
    });
    try {
      await this.roleRepository.save(role);
      return {
        status: true,
        message: `როლი "${rolename}" წარმატებით დაემატა!`,
      };
    } catch (error) {
      if (checkRole) {
        // დუბლირებული კატეგორია
        validateError.push('როლი ამ დასახელებით უკვე არსებობს!');
      }
      if (validateError.length > 0) {
        throw new NotFoundException(validateError);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
