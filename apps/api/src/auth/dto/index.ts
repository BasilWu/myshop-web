export class RegisterDto {
  email!: string;
  password!: string;
  name?: string;
  role?: 'user' | 'admin';
}
export class LoginDto {
  email!: string;
  password!: string;
}