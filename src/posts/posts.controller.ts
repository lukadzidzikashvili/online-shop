import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Users } from 'src/auth/entity/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { userPosts } from './entity/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getAllPosts(): Promise<userPosts[]> {
    return this.postsService.getAllPosts();
  }

  @UseGuards(AuthGuard())
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: Users,
    @UploadedFile() image,
  ): Promise<object> {
    return this.postsService.createPost(createPostDto, user, image);
  }
}
