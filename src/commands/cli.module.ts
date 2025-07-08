import { Module } from '@nestjs/common';
import { SeedDatabase } from './db-seed.command';
import { MyLogger } from '../common-modules/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

// console.log(__dirname)
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
        entities: [__dirname + './../**/*.entity{.ts,.js}'], // console.log(__dirname) to see where it is looking entities from
        synchronize: false,
      }),
      dataSourceFactory: async (options) => {
        const datasource = await new DataSource(options).initialize();

        return datasource;
      },
    }),
  ],
  providers: [SeedDatabase, MyLogger],
})
export class CliModule {}
