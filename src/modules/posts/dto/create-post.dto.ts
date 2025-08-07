import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Users } from 'src/modules/users/entities/user.entity';

export class CreatePostDto {
  @ApiProperty({
    type: 'string',
    example: 'Post 1',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: 'string',
    example: 'Post Description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    type: 'number',
    example: [1, 2, 3],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  contributors: number[];
}
