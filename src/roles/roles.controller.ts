import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto): Promise<object> {
    return this.rolesService.createRole(createRoleDto);
  }
}
