import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  @MinLength(1)
  @IsEmail()
  email: string;
}
