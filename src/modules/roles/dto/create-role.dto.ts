import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    type: 'string',
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
