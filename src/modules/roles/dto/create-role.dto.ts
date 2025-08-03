import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { DBBaseEntity } from 'src/common-modules/entities/base.entity';

export class CreateRoleDto extends DBBaseEntity {
  @ApiProperty({
    type: 'string',
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
