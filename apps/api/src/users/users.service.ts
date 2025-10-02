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
    // 既有的種子（一般 user）
    const hash = bcrypt.hashSync('123456', 10);
    this.users.push(
      { id: '1', email: 'test@test.com',  name: 'Test User', role: 'user',  passwordHash: hash },
      { id: '2', email: 'admin@test.com', name: 'Admin',     role: 'admin', passwordHash: hash },
    );

    // 正式：用環境變數種子第一位 admin（可部署時使用）
    const seEmail = process.env.ADMIN_EMAIL;
    const sePass  = process.env.ADMIN_PASSWORD;
    if (seEmail && sePass && !this.users.find(u => u.email === seEmail)) {
      const h = bcrypt.hashSync(sePass, 10);
      this.users.push({
        id: (this.users.length + 1).toString(),
        email: seEmail,
        name: seEmail.split('@')[0],
        role: 'admin',
        passwordHash: h,
      });
      // 日誌或告警都可加（請避免輸出密碼）
      // console.log(`[seed] admin created: ${seEmail}`);
    }
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.users.find(u => u.email === email) ?? null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.users.find(u => u.id === id) ?? null;
  }

  async create(input: { email: string; password: string; name?: string; role?: Role }): Promise<UserEntity> {
    const exists = await this.findByEmail(input.email);
    if (exists) throw new Error('Email already exists');

    // 若上層已 hash，就直接用；若上層傳原文，則在這裡 hash
    const passwordHash = input.password.startsWith('$2')
      ? input.password
      : await bcrypt.hash(input.password, 10);

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

  async updateRole(id: string, role: Role): Promise<UserEntity> {
    const user = await this.findById(id);
    if (!user) throw new Error('User not found');
    user.role = role;
    return user;
  }

  async all(): Promise<UserEntity[]> {
    return this.users;
  }
}