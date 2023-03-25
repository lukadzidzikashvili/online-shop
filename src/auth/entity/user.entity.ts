import { IsEmail } from 'class-validator';
import { userPosts } from 'src/posts/entity/post.entity';
import { UserRoles } from 'src/roles/entity/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ name: 'email', unique: true })
  @IsEmail({}, { message: 'მეილი არასწორია!' })
  email: string;

  @Column()
  fullname: string;

  @Column()
  password: string;

  @ManyToOne(() => UserRoles, (role) => role.user)
  role: UserRoles;

  @OneToMany(() => userPosts, (post) => post.user, { eager: true })
  posts: userPosts[];

  @Column({ default: 1 })
  isActive: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
