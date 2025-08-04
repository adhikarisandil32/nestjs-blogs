import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { UsersServiceAdmin } from '../services/admin.users.service';
import { PutAdmin } from 'src/modules/auth/decorator/put-user.decorator';
import { PaginatedQueryDto } from 'src/common-modules/swagger-docs/paginate-query.dto';
import { ShowPagination } from 'src/common-modules/response/decorators/response.decorator';

@ApiTags('Users')
// @Controller(`${ControllerPrefix.ADMIN}/users`)
@Controller('users')
export class UsersControllerAdmin {
  constructor(private readonly usersService: UsersServiceAdmin) {}

  @Post('create')
  @PutAdmin()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @PutAdmin()
  @ShowPagination()
  @Get()
  findAll(@Body() queryParams: PaginatedQueryDto) {
    return this.usersService.findPaginated(queryParams);
  }

  @PutAdmin()
  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(+userId);
  }

  @PutAdmin()
  @Patch('update/:userId')
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+userId, updateUserDto);
  }

  @ApiExcludeEndpoint()
  @PutAdmin()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
