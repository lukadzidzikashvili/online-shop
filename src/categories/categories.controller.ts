import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserAuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Categories } from './entity/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Roles('ადმინისტრატორი')
  @UseGuards(UserAuthGuard, RolesGuard)
  @Post()
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<object> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  async getAllCategories(): Promise<Categories[]> {
    return this.categoriesService.getAllCategories();
  }
}
