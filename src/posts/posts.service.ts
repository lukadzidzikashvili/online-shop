import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/auth/entity/user.entity';
import { Categories } from 'src/categories/entity/category.entity';
import { FilesService } from 'src/files/files.service';
import { Locations } from 'src/locations/entity/location.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { userPosts } from './entity/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(userPosts)
    private readonly postsRepository: Repository<userPosts>,
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,
    @InjectRepository(Locations)
    private locationRepository: Repository<Locations>,
    private fileService: FilesService,
  ) {}

  async getAllPosts(): Promise<userPosts[]> {
    const posts = await this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .leftJoinAndSelect('post.location', 'location')
      .select([
        'post',
        'category.id',
        'category.name',
        'category.parentId',
        'location.id',
        'location.country',
        'location.city',
        'location.address',
      ])
      .getMany();

    return posts;
  }

  async createPost(
    createPostDto: CreatePostDto,
    user: Users,
    image: any,
  ): Promise<object> {
    const { title, description, price, telnumber } = createPostDto;
    const category = await this.categoryRepository.findOne({
      where: { id: createPostDto.categoryId },
    });
    const location = await this.locationRepository.findOne({
      where: { id: createPostDto.location },
    });
    const fileName = await this.fileService.createFile(image, user);
    try {
      const post = this.postsRepository.create({
        category: category,
        title,
        description,
        price,
        telnumber,
        location: location,
        image: fileName,
        user,
      });
      await this.postsRepository.save(post);
      return post;
    } catch (error) {
      return {
        status: false,
        message: 'სამწუხაროდ პოსტი ვერ დაემატა!',
      };
    }
  }
}
