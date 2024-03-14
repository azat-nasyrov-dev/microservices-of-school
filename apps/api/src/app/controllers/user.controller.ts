import { Controller, Post, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor() {}

  @UseGuards(JWTAuthGuard)
  @Post('info')
  public async info(@UserId() userId: string) {}
}
