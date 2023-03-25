import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { UserRoles } from './entity/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoles])],
  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}
