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
import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminsServiceAdmin } from '../services/admin.admins.service';
import { PutAdmin } from 'src/modules/auth/decorator/put-user.decorator';
import {
  ResponseMessage,
  ShowPagination,
} from 'src/common-modules/response/decorators/response.decorator';
import { PaginateQueryDto } from 'src/common-modules/swagger-docs/paginate-query.dto';

@ApiTags('Admins')
// @Controller(`${ControllerPrefix.ADMIN}/admins`)
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsServiceAdmin) {}

  @Post('create')
  @PutAdmin()
  @ApiBearerAuth()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @ApiBearerAuth()
  @PutAdmin()
  @ResponseMessage('admins fetch success')
  @ShowPagination()
  @Get()
  findAll(@Query() queryParams: PaginateQueryDto) {
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
