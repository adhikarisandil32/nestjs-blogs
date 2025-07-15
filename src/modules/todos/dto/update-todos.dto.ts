import { PartialType } from '@nestjs/mapped-types';
import { CreateTodosDto } from './create-todos.dto';

export class UpdateTodosDto extends PartialType(CreateTodosDto) {}
