import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodosDto {
  @ApiProperty({ example: 'My Todo Title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'This is the description of my todo' })
  @IsString()
  description: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  isCompleted: boolean;
}
