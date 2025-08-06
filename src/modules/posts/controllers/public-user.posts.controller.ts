import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { PostsServicePublic } from '../services/public-user.posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsControllerPublic {
  constructor(private readonly postsService: PostsServicePublic) {}

  @Post('create')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @ApiExcludeEndpoint()
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
