import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserEventEmitter {
  constructor(private readonly rmqService: RMQService) {}

  public async handle(user: UserEntity) {
    for (const event of user.events) {
      await this.rmqService.notify(event.topic, event.data);
    }
  }
}
