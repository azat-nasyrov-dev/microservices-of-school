import { Body, Controller, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountLogin, AccountRegister } from '@microservices-of-school/contracts';
import { RMQRoute } from 'nestjs-rmq';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @RMQRoute(AccountRegister.topic)
  public async register(@Body() dto: AccountRegister.Request): Promise<AccountRegister.Response> {
    return await this.authService.signup(dto);
  }

 @RMQRoute(AccountLogin.topic)
  public async login(@Body() { email, password }: AccountLogin.Request): Promise<AccountLogin.Response> {
    const { id } = await this.authService.validateUser(email, password);
    return await this.authService.signin(id);
  }
}
