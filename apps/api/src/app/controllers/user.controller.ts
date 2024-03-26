import { Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../decorators/user.decorator';
import { Cron } from '@nestjs/schedule';

@Controller('user')
export class UserController {
  constructor() {}

  @UseGuards(JWTAuthGuard)
  @Post('info')
  public async info(@UserId() userId: string) {}

  @Cron('*/5 * * * * *')
  public async cron() {
    Logger.log('Done');
  }
}
