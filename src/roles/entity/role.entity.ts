import { Users } from 'src/auth/entity/user.entity';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserRoles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rolename: string;

  @OneToMany(() => Users, (user) => user.role)
  user: Users;
}
