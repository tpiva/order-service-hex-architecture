import { Options } from '@mikro-orm/mysql';
import { MySqlDriver } from '@mikro-orm/mysql';
import { OrderSchema } from './schemas/order/order.schema';
import { OrderItemSchema } from './schemas/order/order-item.schema';
import { AddressSchema } from './schemas/order/address.schema';
import { Migrator } from '@mikro-orm/migrations';
import * as dotenv from 'dotenv';
import { SeedManager } from '@mikro-orm/seeder';
import { ProductSchema } from './schemas/order/product.schema';

dotenv.config();

const config: Options = {
  driver: MySqlDriver,
  dbName: process.env.DB_NAME || 'order_service',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  entities: [OrderSchema, OrderItemSchema, AddressSchema, ProductSchema],
  debug: process.env.NODE_ENV !== 'production',
  extensions: [Migrator, SeedManager],
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
  },
  seeder: {
    path: './dist/seeders',
    pathTs: './src/seeders',
  },
};

export default config;
