import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/user.entity';
import { UserRole } from 'src/constants/user-roles.constant';
import { Roles } from 'src/modules/roles/entities/role.entity';
import { findAllPaginatedData } from 'src/common-modules/utils/functions/common-query';
import { PaginatedQueryDto } from 'src/common-modules/swagger-docs/paginate-query.dto';

@Injectable()
export class UsersServiceAdmin {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private _dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const [existingUserInUsers, existingUserInAdmins] = await Promise.all([
      this.usersRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      }),
      this._dataSource.manager.findOne(Users, {
        where: {
          email: createUserDto.email,
        },
      }),
    ]);

    if (existingUserInUsers || existingUserInAdmins)
      throw new ConflictException('user already exists with this email');

    const preparedData = await this.prepareUserCreateData(createUserDto);

    const user = this.usersRepository.create(preparedData);

    await this.usersRepository.save(user);

    return user;
  }

  async findPaginated(queryParams: PaginatedQueryDto) {
    const data = findAllPaginatedData<Users>({
      ...queryParams,
      repo: this.usersRepository,
      validSearchFields: [],
      validSortFields: [],
      queryOptions: {},
    });

    return data;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
      select: {
        createdAt: true,
        deletedAt: true,
        updatedAt: true,
        email: true,
        id: true,
        name: true,
      },
    });

    if (!user) throw new NotFoundException("user doesn't exist");

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const prepareUpdateUserData = this.usersRepository.create(updateUserDto);

    const afterUpdate = await this.usersRepository.update(
      id,
      prepareUpdateUserData,
    );

    let data: Users;
    if (afterUpdate.affected > 0) {
      data = await this.usersRepository.findOne({ where: { id } });
    }

    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async prepareUserCreateData(createUserDto: CreateUserDto) {
    const publicUserRole = await this._dataSource.manager.findOne(Roles, {
      where: {
        role: UserRole.USER,
      },
      select: {
        id: true,
        role: true,
      },
    });

    return {
      ...createUserDto,
      role: publicUserRole,
    };
  }
}
