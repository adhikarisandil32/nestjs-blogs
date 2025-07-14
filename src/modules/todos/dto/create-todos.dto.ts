import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodosDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  isCompleted: boolean;
}
