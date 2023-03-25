import { Exclude } from 'class-transformer';
import { Users } from 'src/auth/entity/user.entity';
import { Categories } from 'src/categories/entity/category.entity';
import { Locations } from 'src/locations/entity/location.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class userPosts {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Categories, (category) => category.post)
  category: Categories;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  telnumber: string;

  @ManyToOne(() => Locations, (location) => location.post)
  location: Locations;

  @Column()
  image: string;

  @ManyToOne(() => Users, (user) => user.posts, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: Users;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
