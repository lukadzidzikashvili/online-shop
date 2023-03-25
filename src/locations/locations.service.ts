import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { Locations } from './entity/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Locations)
    private locationRepository: Repository<Locations>,
  ) {}

  async createLocation(createLocationDto: CreateLocationDto): Promise<object> {
    const { country, city, address } = createLocationDto;
    const validateError = [];
    const checkCountry = await this.locationRepository.findOne({
      where: { country },
    });
    const checkCity = await this.locationRepository.findOne({
      where: { city },
    });
    const location = this.locationRepository.create({
      country,
      city,
      address,
    });
    try {
      await this.locationRepository.save(location);
      return {
        status: true,
        message: `ლოკაცია "${country}" წარმატებით დაემატა!`,
      };
    } catch (error) {
      if (checkCountry) {
        // დუბლირებული კატეგორია
        validateError.push('ქვეყანა ამ დასახელებით უკვე არსებობს!');
      }
      if (checkCity) {
        // დუბლირებული კატეგორია
        validateError.push('ქალაქი ამ დასახელებით უკვე არსებობს!');
      }
      if (validateError.length > 0) {
        throw new NotFoundException(validateError);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
