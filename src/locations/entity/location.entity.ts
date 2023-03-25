import { userPosts } from 'src/posts/entity/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Locations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @OneToMany(() => userPosts, (post) => post.location)
  post: userPosts[];
}
