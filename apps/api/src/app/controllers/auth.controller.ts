import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AccountLogin, AccountRegister } from '@microservices-of-school/contracts';
import { RMQService } from 'nestjs-rmq';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly rmqService: RMQService) {}

  @Post('register')
  public async register(@Body() dto: RegisterDto) {
    try {
      return await this.rmqService
        .send<AccountRegister.Request, AccountRegister.Response>(AccountRegister.topic, dto);
    } catch (err) {
      if (err instanceof Error) {
        throw new UnauthorizedException(err.message);
      }
    }
  }

  @Post('login')
  public async login(@Body() dto: LoginDto) {
    try {
      return await this.rmqService
        .send<AccountLogin.Request, AccountLogin.Response>(AccountLogin.topic, dto);
    } catch (err) {
      if (err instanceof Error) {
        throw new UnauthorizedException(err.message);
      }
    }
  }
}
