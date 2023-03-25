import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserAuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Roles('ადმინისტრატორი')
  @UseGuards(UserAuthGuard, RolesGuard)
  @Post()
  createCategory(
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<object> {
    return this.locationsService.createLocation(createLocationDto);
  }
}
