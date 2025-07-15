import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreateTodosDto } from './dto/create-todos.dto';
import { UpdateTodosDto } from './dto/update-todos.dto';
import { TodosService } from './todos.service';
import {
  ResponseMessage,
  ShowPagination,
} from '../../common-modules/response/decorators/response.decorator';
import { AuthGuard } from '../../auth/decorator/auth-guard.decorator';
import { Request as IRequest } from 'express';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // look at https://stackoverflow.com/questions/62700524/nest-js-only-accept-fields-that-are-specified-in-a-dto
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiBearerAuth()
  @Post()
  @AuthGuard()
  @ResponseMessage('Todo create success')
  // below pipe will only validate and put it into body whose dtos are created is validated
  // @UsePipes(new ValidationPipe({ whitelist: true }))
  // or look at main.ts to see how validaiton pipe can be used globally
  create(@Body() createTodoDto: CreateTodosDto, @Request() request: IRequest) {
    return this.todosService.create(request, createTodoDto);
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
  @ApiQuery({
    name: 'sort',
    required: false,
    type: 'string',
    example: 'title.asc',
    description: 'in the format of key.sort_order',
  })
  @ApiBearerAuth()
  @Get()
  @ResponseMessage('Todos fetch success')
  @ShowPagination()
  @AuthGuard()
  // @SetMetadata('ShowPagination', true)
  findAllPaginated(
    @Request() request: IRequest,
    @Query() searchParams: Record<string, any>,
  ): {} {
    return this.todosService.findAllPaginated(request, { searchParams });
  }

  @ApiOperation({ summary: 'List a todos by id' })
  @ResponseMessage('Todo fetch success')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a todo' })
  @ResponseMessage('Update todo success')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodosDto: UpdateTodosDto) {
    return this.todosService.update(+id, updateTodosDto);
  }

  @ApiOperation({ summary: 'Delete a todo' })
  // @ApiExcludeEndpoint() // this will hide the endpoint from swagger
  @ResponseMessage('Todo delete success')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
