import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({
    example: 'Admin Admin',
  })
  name: string;

  @IsNotEmpty()
  @MinLength(1)
  @IsEmail()
  @ApiProperty({
    example: 'admin@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  @ApiProperty({
    example: 'Test@123',
  })
  password: string;
}
