import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export class UpdateUserDto {
  @ApiProperty({
    type: 'string',
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;
}

export class UpdateUserPasswordDto {
  @ApiProperty({
    type: 'string',
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    type: 'string',
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
