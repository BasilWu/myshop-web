import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  @Roles('admin')
  list() {
    return this.users.all();
  }

  @Patch(':id/role')
  @Roles('admin')
  async changeRole(
    @Param('id') id: string,
    @Body() body: { role: 'user' | 'admin' },
  ) {
    return this.users.updateRole(id, body.role);
  }
}