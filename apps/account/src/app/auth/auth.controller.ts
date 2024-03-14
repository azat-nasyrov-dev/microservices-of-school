import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountLogin } from '@microservices-of-school/contracts';
import { AccountRegister } from '@microservices-of-school/contracts';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() dto: AccountRegister.Request): Promise<AccountRegister.Response> {
    return await this.authService.signup(dto);
  }

  @Post('login')
  @HttpCode(200)
  public async login(@Body() { email, password }: AccountLogin.Request): Promise<AccountLogin.Response> {
    const { id } = await this.authService.validateUser(email, password);
    return await this.authService.signin(id);
  }
}
