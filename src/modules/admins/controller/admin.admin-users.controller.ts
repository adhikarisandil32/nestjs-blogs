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
import { Admins } from '../entities/admin.entity';
import { User } from 'src/common-modules/request/decorators/request.decorator';

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
  findAllPaginated(@Query() queryParams: PaginatedQueryDto) {
    // console.log(queryParams);
    return this.adminsService.findAllPaginated(queryParams);
  }

  @Get(':id')
  @PutAdmin()
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(+id);
  }

  @Patch('update/me')
  @PutAdmin()
  update(@User() admin: Admins, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update({ admin, updateAdminDto });
  }
}
