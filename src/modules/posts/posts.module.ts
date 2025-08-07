import { Module } from '@nestjs/common';
import { PostsServiceAdmin } from './services/admin.posts.service';
import { PostsServicePublic } from './services/public-user.posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  providers: [PostsServiceAdmin, PostsServicePublic],
  exports: [PostsServiceAdmin, PostsServicePublic],
})
export class PostsModule {}
