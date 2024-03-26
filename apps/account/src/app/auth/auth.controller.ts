import { Body, Controller, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountLogin, AccountRegister } from '@microservices-of-school/contracts';
import { Message, RMQMessage, RMQRoute, RMQValidate } from 'nestjs-rmq';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @RMQValidate()
  @RMQRoute(AccountRegister.topic)
  public async register(dto: AccountRegister.Request, @RMQMessage msg: Message): Promise<AccountRegister.Response> {
    const rid = msg.properties.headers['requestId'];
    const logger = new Logger(rid);
    logger.error('something went wrong');

    return await this.authService.signup(dto);
  }

  @RMQValidate()
  @RMQRoute(AccountLogin.topic)
  public async login(@Body() { email, password }: AccountLogin.Request): Promise<AccountLogin.Response> {
    const { id } = await this.authService.validateUser(email, password);
    return await this.authService.signin(id);
  }
}
