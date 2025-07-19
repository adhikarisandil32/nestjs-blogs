// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateTodosDto } from './create-todos.dto';

// partial type import from swagger instead of mapped types also puts all form the CreateTodosDto
export class UpdateTodosDto extends PartialType(CreateTodosDto) {}
