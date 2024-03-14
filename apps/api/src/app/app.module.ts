import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './config/rmq.config';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from './config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.api.env',
    }),
    RMQModule.forRootAsync(getRMQConfig()),
    JwtModule.registerAsync(getJWTConfig()),
    PassportModule,
  ],
  controllers: [AuthController, UserController],
})
export class AppModule {}
