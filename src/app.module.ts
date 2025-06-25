import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      // type: 'sqlite',
      // database: 'database/db.sqlite',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      // synchronize: false,
      // retryAttempts: 10,
      // retryDelay: 1000,
      useFactory: () => ({
        type: 'sqlite',
        database: 'database/db.sqlite',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        synchronize: false,
        retryAttempts: 10,
        retryDelay: 1000,
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
