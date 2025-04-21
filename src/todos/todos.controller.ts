import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodosDto } from './dto/create-todos.dto';
import { UpdateTodosDto } from './dto/update-todos.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // look at https://stackoverflow.com/questions/62700524/nest-js-only-accept-fields-that-are-specified-in-a-dto
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createTodoDto: CreateTodosDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll(@Query() searchParams: Record<string, any>): {} {
    return this.todosService.findAll({ searchParams });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodosDto: UpdateTodosDto) {
    return this.todosService.update(+id, updateTodosDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
