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
import { PutAdmin } from 'src/modules/auth/decorator/put-user.decorator';
import { Users } from 'src/modules/users/entities/user.entity';
import { User } from 'src/common-modules/request/decorators/request.decorator';
import { PaginatedQueryDto } from 'src/common-modules/swagger-docs/paginate-query.dto';
import { TodosServiceAdmin } from '../services/admin.todos.service';

@ApiTags('Todos')
// @Controller(`${ControllerPrefix.ADMIN}/todos`)
@Controller('todos')
export class TodosControllerAdmin {
  constructor(private readonly todosService: TodosServiceAdmin) {}

  // look at https://stackoverflow.com/questions/62700524/nest-js-only-accept-fields-that-are-specified-in-a-dto
  @ApiOperation({ summary: 'Create a new todo' })
  @Post('create')
  @PutAdmin()
  @ResponseMessage('Todo create success')
  // below pipe will only validate and put it into body whose dtos are created is validated
  // @UsePipes(new ValidationPipe({ whitelist: true }))
  // or look at main.ts to see how validaiton pipe can be used globally
  create(@User() user: Users, @Body() createTodoDto: CreateTodosDto) {
    return this.todosService.create(user, createTodoDto);
  }

  @ApiOperation({ summary: 'List all todos' })
  @Get()
  @ResponseMessage('Todos fetch success')
  @ShowPagination()
  @PutAdmin()
  // @SetMetadata('ShowPagination', true)
  findAllPaginated(
    @User() user: Users,
    @Query() searchParams: PaginatedQueryDto,
  ): {} {
    return this.todosService.findAllPaginated(user, { searchParams });
  }

  @ApiOperation({ summary: 'List a todos by id' })
  @ResponseMessage('Todo fetch success')
  @Get(':id')
  @PutAdmin()
  findOne(@User() user: Users, @Param('id') id: string) {
    return this.todosService.findOne(user, +id);
  }

  @ApiOperation({ summary: 'Update a todo' })
  @ResponseMessage('Update todo success')
  @Patch(':id')
  @PutAdmin()
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
  @PutAdmin()
  remove(@User() user: Users, @Param('id') id: string) {
    return this.todosService.remove(user, +id);
  }
}
