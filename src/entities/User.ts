import { IsEmail, Length } from 'class-validator';
import {
  Entity as TOENtity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

import Entity from './Entity';
import Post from './Post';

@TOENtity('users')
export default class User extends Entity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Index()
  @IsEmail(undefined, { message: 'Must be a vaild email address!' })
  @Length(1, 255, { message: 'Email is empty!' })
  @Column({ unique: true })
  email: string;

  @Index()
  @Length(3, 255, { message: 'Must be at least 3 characters long!' })
  @Column({ unique: true })
  username: string;

  @Exclude()
  @Index()
  @Length(6, 255, { message: 'Must be at least 6 characters long!' })
  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
