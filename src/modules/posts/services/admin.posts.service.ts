import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Admins } from 'src/modules/admins/entities/admin.entity';
import { DataSource, Repository } from 'typeorm';
import { Posts } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/modules/users/entities/user.entity';
import { PutAdmin } from 'src/modules/auth/decorator/put-user.decorator';
import { ResponseMessage } from 'src/common-modules/response/decorators/response.decorator';
import { PaginatedQueryDto } from 'src/common-modules/swagger-docs/paginate-query.dto';
import { findAllPaginatedData } from 'src/common-modules/utils/functions/common-query';

@Injectable()
export class PostsServiceAdmin {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
    private readonly _dataSource: DataSource,
  ) {}

  async create(admin: Admins, createPostDto: CreatePostDto) {
    const preparedData = await this.prepareCreateData(admin, createPostDto);

    const data = this.postsRepository.create(preparedData);

    await this.postsRepository.save(data);

    return data;
  }

  async findAll(paginatedQueryDto: PaginatedQueryDto) {
    const data = await findAllPaginatedData<Posts>({
      ...paginatedQueryDto,
      repo: this.postsRepository,
      validSearchFields: [],
      validSortFields: [],
      queryOptions: {
        select: {
          // author_admin: {
          //   id: true,
          //   email: true,
          //   name: true,
          // },
          author_user: {
            id: true,
            email: true,
            name: true,
          },
          contributors: {
            id: true,
            email: true,
            name: true,
          },
        },
        relations: {
          // author_admin: true,
          author_user: true,
          contributors: true,
        },
      },
    });

    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  async prepareCreateData(admin: Admins, createPostDto: CreatePostDto) {
    try {
      const contributingUsers = await Promise.all([
        ...createPostDto.contributors.map((contributor) =>
          this._dataSource.manager.findOne(Users, {
            where: { id: contributor },
          }),
        ),
      ]);

      const author = await this._dataSource.manager.findOne(Admins, {
        where: { id: admin.id },
      });

      return {
        ...createPostDto,
        author_admin: author,
        contributors: contributingUsers,
      };
    } catch (error) {
      throw new NotFoundException('user not found');
    }
  }
}
