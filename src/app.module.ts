import { Module } from '@nestjs/common';
import { UserModule } from './application/modules/order/order.module';
import { DatabaseModule } from './adapters/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { QueueModule } from './adapters/queue/queue.module';
import { PaymentModule } from './adapters/apis/payment.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    QueueModule,
    PaymentModule,
  ],
})
export class AppModule {}
