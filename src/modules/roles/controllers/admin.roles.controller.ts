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
import { RolesService } from '../roles.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginatedQueryDto } from 'src/common-modules/swagger-docs/paginate-query.dto';
import { ShowPagination } from 'src/common-modules/response/decorators/response.decorator';
import { PutAdmin } from 'src/modules/auth/decorator/put-user.decorator';
// import { ApiTags } from '@nestjs/swagger';

// @Controller(`${ControllerPrefix.ADMIN}/roles`)

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @PutAdmin()
  @Post('create')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @PutAdmin()
  @ShowPagination()
  @Get()
  findAllPaginated(@Query() queryParams: PaginatedQueryDto) {
    return this.rolesService.findPaginated(queryParams);
  }

  @PutAdmin()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @PutAdmin()
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }
}
