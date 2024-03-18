import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './models/user.model';
import { UserRepository } from './repositories/user.repository';
import { UserCommands } from './user.commands';
import { UserQueries } from './user.queries';
import { UserEventEmitter } from './user.event-emitter';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }])],
  controllers: [UserCommands, UserQueries],
  providers: [UserRepository, UserEventEmitter, UserService],
  exports: [UserRepository],
})
export class UserModule {}
