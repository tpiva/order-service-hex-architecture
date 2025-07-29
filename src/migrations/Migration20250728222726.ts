import { Migration } from '@mikro-orm/migrations';

export class Migration20250728222726 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table \`Post\` drop foreign key \`Post_authorId_fkey\`;`,
    );

    this.addSql(
      `create table \`address\` (\`id\` int unsigned not null auto_increment primary key, \`street\` varchar(255) not null, \`city\` varchar(255) not null, \`state\` varchar(255) not null, \`street_number\` int not null) default character set utf8mb4 engine = InnoDB;`,
    );

    this.addSql(
      `create table \`orders\` (\`id\` int unsigned not null auto_increment primary key, \`customer_id\` int not null, \`status\` enum('PENDING', 'PAID', 'SHIPPED', 'CANCELLED') not null, \`shipping_address_id\` int unsigned not null, \`created_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`,
    );
    this.addSql(
      `alter table \`orders\` add index \`orders_shipping_address_id_index\`(\`shipping_address_id\`);`,
    );

    this.addSql(
      `create table \`order_items\` (\`id\` int unsigned not null auto_increment primary key, \`product_id\` int not null, \`quantity\` int not null, \`price\` int not null, \`order_id\` int unsigned not null) default character set utf8mb4 engine = InnoDB;`,
    );
    this.addSql(
      `alter table \`order_items\` add index \`order_items_order_id_index\`(\`order_id\`);`,
    );

    this.addSql(
      `create table \`order_status_entity\` (\`id\` int unsigned not null auto_increment primary key, \`status\` enum('PENDING', 'PAID', 'SHIPPED', 'CANCELLED') not null) default character set utf8mb4 engine = InnoDB;`,
    );

    this.addSql(
      `alter table \`orders\` add constraint \`orders_shipping_address_id_foreign\` foreign key (\`shipping_address_id\`) references \`address\` (\`id\`) on update cascade;`,
    );

    this.addSql(
      `alter table \`order_items\` add constraint \`order_items_order_id_foreign\` foreign key (\`order_id\`) references \`orders\` (\`id\`) on update cascade;`,
    );

    this.addSql(`drop table if exists \`_prisma_migrations\`;`);

    this.addSql(`drop table if exists \`Post\`;`);

    this.addSql(`drop table if exists \`User\`;`);

    this.addSql(`drop table if exists \`UserHistory\`;`);
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table \`orders\` drop foreign key \`orders_shipping_address_id_foreign\`;`,
    );

    this.addSql(
      `alter table \`order_items\` drop foreign key \`order_items_order_id_foreign\`;`,
    );

    this.addSql(
      `create table \`_prisma_migrations\` (\`id\` varchar(36) not null, \`checksum\` varchar(64) not null, \`finished_at\` datetime(3) null, \`migration_name\` varchar(255) not null, \`logs\` text null, \`rolled_back_at\` datetime(3) null, \`started_at\` datetime(3) not null default current_timestamp(3), \`applied_steps_count\` int unsigned not null default 0, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`,
    );

    this.addSql(
      `create table \`Post\` (\`id\` int not null auto_increment primary key, \`title\` varchar(191) not null, \`content\` varchar(191) null, \`published\` tinyint(1) null default false, \`authorId\` int null) default character set utf8mb4 engine = InnoDB;`,
    );
    this.addSql(
      `alter table \`Post\` add index \`Post_authorId_fkey\`(\`authorId\`);`,
    );

    this.addSql(
      `create table \`User\` (\`id\` int not null auto_increment primary key, \`email\` varchar(191) not null, \`name\` varchar(191) null) default character set utf8mb4 engine = InnoDB;`,
    );
    this.addSql(
      `alter table \`User\` add unique \`User_email_key\`(\`email\`);`,
    );

    this.addSql(
      `create table \`UserHistory\` (\`id\` int not null auto_increment primary key, \`data\` text not null) default character set utf8mb4 engine = InnoDB;`,
    );

    this.addSql(
      `alter table \`Post\` add constraint \`Post_authorId_fkey\` foreign key (\`authorId\`) references \`User\` (\`id\`) on update cascade on delete set null;`,
    );

    this.addSql(`drop table if exists \`address\`;`);

    this.addSql(`drop table if exists \`orders\`;`);

    this.addSql(`drop table if exists \`order_items\`;`);

    this.addSql(`drop table if exists \`order_status_entity\`;`);
  }
}
