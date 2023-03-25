import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locations } from './entity/location.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Users } from 'src/auth/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Locations, Users]), AuthModule],
  providers: [LocationsService],
  controllers: [LocationsController],
})
export class LocationsModule {}
