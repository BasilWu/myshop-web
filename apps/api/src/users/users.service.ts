import { Injectable } from '@nestjs/common';

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
    const seedHash = '$2a$10$z3Ck6z3Ck6z3Ck6z3Ck6zOeV7kq1nq5...' // 123456 的任意有效 hash；或保留你現有的
    this.users.push(
      { id: '1', email: 'test@test.com',  name: 'Test User', role: 'user',  passwordHash: seedHash },
      { id: '2', email: 'admin@test.com', name: 'Admin',     role: 'admin', passwordHash: seedHash },
    );
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.users.find(u => u.email === email) ?? null;
  }

  async create(input: { email: string; name: string; role: Role; passwordHash: string }): Promise<UserEntity> {
    const exists = await this.findByEmail(input.email);
    if (exists) throw new Error('Email already exists');

    const user: UserEntity = {
      id: (this.users.length + 1).toString(),
      email: input.email,
      name: input.name,
      role: input.role,
      passwordHash: input.passwordHash,
    };
    this.users.push(user);
    return user;
  }
}