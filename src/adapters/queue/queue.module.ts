import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderQueueConsumer } from './order.consumer';
import { OrderQueueProducer } from './order.producer';
import { PaymentModule } from '../apis/payment.module';

@Module({
  imports: [
    // CacheModule.registerAsync({ // TODO: Add a status of each queue
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => {
    //     const redisUrl = `redis://${
    //       configService.get('REDIS_PASSWORD')
    //         ? ':' + configService.get('REDIS_PASSWORD') + '@'
    //         : ''
    //     }${configService.get('REDIS_HOST', 'localhost')}:${configService.get(
    //       'REDIS_PORT',
    //       6379,
    //     )}/${configService.get('REDIS_DB', 0)}`;

    //     const keyv = new Keyv({
    //       store: new KeyvRedis(redisUrl),
    //       ttl: configService.get<number>('CACHE_TTL', 300000),
    //       namespace: configService.get('CACHE_NAMESPACE', 'app'),
    //     });

    //     return {
    //       store: keyv,
    //     };
    //   },
    // }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        // const password = configService.get('REDIS_PASSWORD');
        // const encodedPassword = password ? encodeURIComponent(password) : '';

        // const redisUrl = `redis://${
        //   encodedPassword ? ':' + encodedPassword + '@' : ''
        // }${configService.get('REDIS_HOST', 'localhost')}:${configService.get(
        //   'REDIS_PORT',
        //   6379,
        // )}/${configService.get('REDIS_DB', 0)}`;
        return {
          connection: {
            host: configService.get('REDIS_HOST', 'localhost'),
            port: configService.get('REDIS_PORT', 6379),
            password: configService.get('REDIS_PASSWORD'),
            db: configService.get('REDIS_DB', 0),
          },
        };
      },
      inject: [ConfigService],
    }),

    BullModule.registerQueue({
      name: 'order-processing',
    }),

    PaymentModule,
  ],
  providers: [
    OrderQueueConsumer,
    OrderQueueProducer,
    // {
    //   provide: 'PAYMENT_SERVICE_TOKEN',
    //   useClass: PaymentService,
    // },
  ],
  exports: [OrderQueueConsumer, OrderQueueProducer],
})
export class QueueModule {}
