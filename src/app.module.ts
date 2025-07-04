import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        host: 'localhost',
        port: Number(process.env.DATABASE_PORT),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        synchronize: false,
      }),
      dataSourceFactory: async (options) => {
        const datasource = await new DataSource(options).initialize();

        return datasource;
      },
    }),
    TodosModule,
    UsersModule,
  ],
})
export class AppModule {}
