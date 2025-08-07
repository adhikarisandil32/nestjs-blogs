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
import { CreatePostDto } from '../dto/create-post.dto';
import { PostsServiceAdmin } from '../services/admin.posts.service';
import { UpdatePostDto } from '../dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { PutAdmin } from 'src/modules/auth/decorator/put-user.decorator';
import { User } from 'src/common-modules/request/decorators/request.decorator';
import { Admins } from 'src/modules/admins/entities/admin.entity';
import { ResponseMessage } from 'src/common-modules/response/decorators/response.decorator';
import { PaginatedQueryDto } from 'src/common-modules/swagger-docs/paginate-query.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsControllerAdmin {
  constructor(private readonly postsService: PostsServiceAdmin) {}

  @ResponseMessage('post create success')
  @PutAdmin()
  @Post('create')
  create(@User() admin: Admins, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(admin, createPostDto);
  }

  @ResponseMessage('posts fetch success')
  @PutAdmin()
  @Get()
  findAll(@Query() paginatedQueryDto: PaginatedQueryDto) {
    return this.postsService.findAll(paginatedQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
