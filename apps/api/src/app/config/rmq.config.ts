import { IRMQServiceAsyncOptions } from 'nestjs-rmq';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const getRMQConfig = (): IRMQServiceAsyncOptions => ({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    exchangeName: configService.get('AMQP_EXCHANGE') ?? '',
    connections: [
      {
        login: configService.get('AMQP_USER') ?? '',
        password: configService.get('AMQP_PASSWORD') ?? '',
        host: configService.get('AMQP_HOSTNAME') ?? '',
      }
    ],
    queueName: configService.get('AMQP_QUEUE'),
    prefetchCount: 32,
    serviceName: 'microservices-of-school-account'
  }),
  inject: [ConfigService],
});
