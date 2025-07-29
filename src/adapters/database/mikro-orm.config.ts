import { Options } from '@mikro-orm/mysql';
import { MySqlDriver } from '@mikro-orm/mysql';
import { OrderSchema } from './schemas/order/order.schema';
import { OrderItemSchema } from './schemas/order/order-item.schema';
import { AddressSchema } from './schemas/order/address.schema';
import { OrderStatusSchema } from './schemas/order/order-status.schema';
import { Migrator } from '@mikro-orm/migrations';
import * as dotenv from 'dotenv';

dotenv.config();

const config: Options = {
  driver: MySqlDriver,
  dbName: process.env.DB_NAME || 'order_service',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  entities: [OrderSchema, OrderItemSchema, AddressSchema, OrderStatusSchema],
  debug: process.env.NODE_ENV !== 'production',
  forceEntityConstructor: true,
  extensions: [Migrator],
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
  },
};

export default config;
