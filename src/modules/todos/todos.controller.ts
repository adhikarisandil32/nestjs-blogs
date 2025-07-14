import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
} from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreateTodosDto } from './dto/create-todos.dto';
import { UpdateTodosDto } from './dto/update-todos.dto';
import { TodosService } from './todos.service';
import {
  ResponseMessage,
  ShowPagination,
} from '../../common-modules/response/decorators/response.decorator';

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
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'integer',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: 'integer',
  })
  @Get()
  @ResponseMessage('Todos fetch success')
  @ShowPagination()
  // @SetMetadata('ShowPagination', true)
  findAllPaginated(@Query() searchParams: Record<string, any>): {} {
    return this.todosService.findAllPaginated({ searchParams });
  }

  @ApiOperation({ summary: 'List a todos by id' })
  @ResponseMessage('Todo fetch success')
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
