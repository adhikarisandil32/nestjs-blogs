import { DataSource } from 'typeorm';

export const AppDataSource: DataSource = new DataSource({
  type: 'sqlite',
  database: 'database/db.sqlite',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
});
