import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PaginatedQueryDto {
  @ApiPropertyOptional({
    type: 'string',
  })
  @IsOptional()
  @IsString()
  searchField: string;

  @ApiPropertyOptional({
    type: 'string',
  })
  @IsOptional()
  @IsString()
  search: string;

  @ApiPropertyOptional({
    type: 'string',
    example: 'createdAt',
  })
  @IsString()
  @IsOptional()
  sortField: string;

  @ApiPropertyOptional({
    enum: ['ASC', 'DESC'],
  })
  @IsOptional()
  @IsString()
  sortOrder: string;

  @ApiPropertyOptional({
    type: 'integer',
    description: 'between 1 and 100',
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit: number;

  @ApiPropertyOptional({
    type: 'integer',
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number;

  @ApiPropertyOptional({
    type: 'boolean',
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) {
      return true;
    }
    if (value === 'false' || value === false) {
      return false;
    }
    return undefined;
  })
  skipPagination: boolean;
}
