import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginatedQueryDto {
  @ApiPropertyOptional({
    name: 'sort',
    type: 'string',
    description: 'Enter in the format of property_key.sort_order',
    example: 'createdAt.asc',
  })
  @IsString()
  @IsOptional()
  sort: string;

  @ApiPropertyOptional({
    name: 'limit',
    type: 'integer',
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit: number;

  @ApiPropertyOptional({
    name: 'page',
    type: 'integer',
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number;
}
