import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Admins } from 'src/modules/admins/entities/admin.entity';
import { DataSource, Repository } from 'typeorm';
import { Posts } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedQueryDto } from 'src/common-modules/swagger-docs/paginate-query.dto';
import { findAllPaginatedData } from 'src/common-modules/utils/functions/common-query';
import { CommonUser } from 'src/modules/common-users/entities/common-user.entity';

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
          author: {
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
          author: true,
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

  async prepareCreateData(
    admin: Admins,
    createPostDto: CreatePostDto,
  ): Promise<Partial<Posts>> {
    try {
      const contributingUsers = await Promise.all(
        createPostDto.contributors.map((contributor) =>
          this._dataSource.manager.findOne(CommonUser, {
            where: { id: contributor },
          }),
        ),
      );

      const author = await this._dataSource.manager.findOne(Admins, {
        where: { id: admin.id },
      });

      return {
        ...createPostDto,
        author: author,
        contributors: contributingUsers,
      };
    } catch (error) {
      throw new NotFoundException('user not found');
    }
  }
}
