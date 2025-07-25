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
import { CreateAdminDto } from '../dto/create-admin-user.dto';
import { UpdateAdminDto } from '../dto/update-admin-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AdminsServiceAdmin } from '../services/admin.admin-users.service';
import { PutAdmin } from 'src/modules/auth/decorator/put-user.decorator';
import {
  ResponseMessage,
  ShowPagination,
} from 'src/common-modules/response/decorators/response.decorator';
import { PaginatedQueryDto } from 'src/common-modules/swagger-docs/paginate-query.dto';

@ApiTags('Admins')
// @Controller(`${ControllerPrefix.ADMIN}/admins`)
@Controller('admin-users')
export class AdminsController {
  constructor(private readonly adminsService: AdminsServiceAdmin) {}

  @Post('create')
  @PutAdmin()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @PutAdmin()
  @ResponseMessage('admins fetch success')
  @ShowPagination()
  @Get()
  findAll(@Query() queryParams: PaginatedQueryDto) {
    // console.log(queryParams);
    return this.adminsService.findAll(queryParams);
  }

  @Get(':id')
  @PutAdmin()
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(+id);
  }

  @Patch(':id')
  @PutAdmin()
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @PutAdmin()
  remove(@Param('id') id: string) {
    return this.adminsService.remove(+id);
  }
}
