import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // @ApiProperty({
  //   type: 'string',
  //   example: '',
  // })
  // @IsString()
  // @IsNotEmpty()
  // name: string;
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
