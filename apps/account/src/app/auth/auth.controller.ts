import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

export class RegisterDto {
  readonly displayName?: string;
  readonly email: string;
  readonly password: string;
}

export class LoginDto {
  readonly email: string;
  readonly password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() dto: RegisterDto) {
    return await this.authService.signup(dto);
  }

  @Post('login')
  @HttpCode(200)
  public async login(@Body() { email, password }: LoginDto) {
    const { id } = await this.authService.validateUser(email, password);
    return await this.authService.signin(id);
  }
}
