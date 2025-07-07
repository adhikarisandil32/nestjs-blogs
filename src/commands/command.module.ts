import { Module } from '@nestjs/common';
import { SeedDatabase } from './db-seed.command';

@Module({
  imports: [],
  providers: [SeedDatabase],
})
export class CliModule {}
