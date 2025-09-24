import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export type Role = 'user' | 'admin';

export type UserEntity = {
  id: string;
  email: string;
  name: string;
  role: Role;
  passwordHash: string;
};

@Injectable()
export class UsersService {
  private users: UserEntity[] = [];

  constructor() {
    // 種子資料（密碼皆 123456）
    const hash = bcrypt.hashSync('123456', 10);
    this.users.push(
      { id: '1', email: 'test@test.com',  name: 'Test User', role: 'user',  passwordHash: hash },
      { id: '2', email: 'admin@test.com', name: 'Admin',     role: 'admin', passwordHash: hash },
    );
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.users.find(u => u.email === email) ?? null;
  }

  async create(input: { email: string; password: string; name?: string; role?: Role }): Promise<UserEntity> {
    const exists = await this.findByEmail(input.email);
    if (exists) throw new Error('Email already exists');

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user: UserEntity = {
      id: (this.users.length + 1).toString(),
      email: input.email,
      name: input.name ?? input.email.split('@')[0],
      role: input.role ?? 'user',
      passwordHash,
    };
    this.users.push(user);
    return user;
  }
}