import { Module } from '@nestjs/common';
import { OrderModule } from './application/modules/order/user.module';
import { DatabaseModule } from './adapters/database/database.module';

@Module({
  imports: [OrderModule, DatabaseModule],
})
export class AppModule {}
