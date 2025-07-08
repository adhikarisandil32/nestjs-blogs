import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodosDto } from './dto/create-todos.dto';
import { UpdateTodosDto } from './dto/update-todos.dto';
import { ApiExcludeEndpoint, ApiOperation } from '@nestjs/swagger';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // look at https://stackoverflow.com/questions/62700524/nest-js-only-accept-fields-that-are-specified-in-a-dto
  @ApiOperation({ summary: 'Create a new todo' })
  @Post()
  // below pipe will only validate and put it into body whose dtos are created is validated
  // @UsePipes(new ValidationPipe({ whitelist: true }))
  // or look at main.ts to see how validaiton pipe can be used globally
  create(@Body() createTodoDto: CreateTodosDto) {
    return this.todosService.create(createTodoDto);
  }

  @ApiOperation({ summary: 'List all todos' })
  @Get()
  findAll(@Query() searchParams: Record<string, any>): {} {
    return this.todosService.findAll({ searchParams });
  }

  @ApiOperation({ summary: 'List a todos by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a todo' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodosDto: UpdateTodosDto) {
    return this.todosService.update(+id, updateTodosDto);
  }

  @ApiOperation({ summary: 'Delete a todo' })
  // @ApiExcludeEndpoint() - this will hide the endpoint from swagger
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
