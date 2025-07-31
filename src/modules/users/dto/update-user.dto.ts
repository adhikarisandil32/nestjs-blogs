import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

export class UpdateUserPassword {
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
