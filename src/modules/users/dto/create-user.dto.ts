import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({
    example: 'User User',
  })
  name: string;

  @IsNotEmpty()
  @MinLength(1)
  @IsEmail()
  @ApiProperty({
    example: 'user@email.com',
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
