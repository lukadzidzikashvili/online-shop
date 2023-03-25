import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { userPosts } from './entity/post.entity';
import { Categories } from 'src/categories/entity/category.entity';
import { Locations } from 'src/locations/entity/location.entity';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([userPosts, Categories, Locations]),
    FilesModule,
    AuthModule,
  ],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
