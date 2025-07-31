import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTodosDto } from '../dto/create-todos.dto';
import { UpdateTodosDto } from '../dto/update-todos.dto';
import {
  ResponseMessage,
  ShowPagination,
} from 'src/common-modules/response/decorators/response.decorator';
import { TodosServicePublic } from '../services/public.todos.service';
import { PutPublicUser } from 'src/modules/auth/decorator/put-user.decorator';
import { PaginatedQueryDto } from 'src/common-modules/swagger-docs/paginate-query.dto';
import { User } from 'src/common-modules/request/decorators/request.decorator';
import { Users } from 'src/modules/users/entities/user.entity';

@ApiTags('Todos')
// @Controller(`${ControllerPrefix.PUBLIC}/todos`)
@Controller('todos')
export class TodosControllerPublic {
  constructor(private readonly todosService: TodosServicePublic) {}

  @ApiOperation({ summary: 'Create a new todo' })
  @Post('create')
  @PutPublicUser()
  @ResponseMessage('Todo create success')
  create(@User() user: Users, @Body() createTodoDto: CreateTodosDto) {
    return this.todosService.create(user, createTodoDto);
  }

  @PutPublicUser()
  @ResponseMessage('Todos fetch success')
  @ShowPagination()
  @Get()
  findAllPaginated(
    @User() user: Users,
    @Query() searchParams: PaginatedQueryDto,
  ): {} {
    return this.todosService.findAllPaginated({
      user,
      searchParams,
      validSortKeys: ['title', 'createdAt', 'updatedAt'],
      validSearchKeys: ['title', 'description'],
    });
  }

  @ApiOperation({ summary: 'List a todos by id' })
  @ResponseMessage('Todo fetch success')
  @Get(':id')
  @PutPublicUser()
  findOne(@User() user: Users, @Param('id') id: string) {
    return this.todosService.findOne(user, +id);
  }

  @ApiOperation({ summary: 'Update a todo' })
  @ResponseMessage('Update todo success')
  @Patch(':id')
  @PutPublicUser()
  update(
    @User() user: Users,
    @Param('id') id: string,
    @Body() updateTodosDto: UpdateTodosDto,
  ) {
    return this.todosService.update(user, +id, updateTodosDto);
  }

  @ApiOperation({ summary: 'Delete a todo' })
  // @ApiExcludeEndpoint() // this will hide the endpoint from swagger
  @ResponseMessage('Todo delete success')
  @Delete(':id')
  @PutPublicUser()
  remove(@User() user: Users, @Param('id') id: string) {
    return this.todosService.remove(user, +id);
  }
}
