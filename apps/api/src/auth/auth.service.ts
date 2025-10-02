import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private users: UsersService) {}

  async register(dto: RegisterDto) {
  const exists = await this.users.findByEmail(dto.email);
  if (exists) throw new BadRequestException('Email already registered');

  const passwordHash = await bcrypt.hash(dto.password, 10);
  const user = await this.users.create({
    email: dto.email,
    name: dto.name || dto.email.split('@')[0],
    password: passwordHash,        // 注意：UsersService.create 會負責 hash or 直接接收 hash，依你的實作調整
    role: 'user',
  });
  return this.issue(user);
}

  async login(dto: LoginDto) {
    const user = await this.users.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    return this.issue(user);
  }

  private issue(user: { id: string; email: string; role: string; name: string }) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwt.sign(payload);
    return { token, user: { id: user.id, email: user.email, role: user.role, name: user.name } };
  }
}