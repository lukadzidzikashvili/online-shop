import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class userTokens {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  userIp: string;

  @Column()
  token: string;

  @CreateDateColumn()
  startAt: Date;

  @CreateDateColumn()
  expiresAt: Date;
}
