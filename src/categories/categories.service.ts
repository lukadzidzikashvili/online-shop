import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Categories } from './entity/category.entity';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,
  ) {}

  async getAllCategories(): Promise<Categories[]> {
    const categories = await this.categoryRepository.find();
    // კატეგორიის დაჯგუფება parentId მიხედვით
    const categoriesByParentId = categories.reduce(
      (acc, category) => ({
        ...acc,
        [category.parentId]: [...(acc[category.parentId] ?? []), category],
      }),
      {},
    );
    // საბკატეგორიების დამატება კატეგორიაზე
    categories.forEach((category) => {
      category.subcategories = categoriesByParentId[category.id];
    });
    // ყველა იმ კატეგორიის დაბრუნება რომელიც არ არის საბ კატეგორია
    return categories.filter((category) => !category.parentId);
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<object> {
    const { name, parentId } = createCategoryDto;
    const validateError = [];
    const checkCat = await this.categoryRepository.findOne({
      where: { name },
    });
    const category = this.categoryRepository.create({
      name,
      parentId,
    });
    try {
      await this.categoryRepository.save(category);
      return {
        status: true,
        message: `კატეგორია "${name}" წარმატებით დაემატა!`,
      };
    } catch (error) {
      if (checkCat) {
        // დუბლირებული კატეგორია
        validateError.push('კატეგორია ამ დასახელებით უკვე არსებობს!');
      }
      if (validateError.length > 0) {
        throw new NotFoundException(validateError);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
