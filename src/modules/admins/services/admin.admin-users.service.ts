import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from '../dto/create-admin-user.dto';
import { UpdateAdminDto } from '../dto/update-admin-user.dto';
import { DataSource, Repository } from 'typeorm';
import { Admins } from '../entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/modules/roles/entities/role.entity';
import { UserRole } from 'src/constants/user-roles.constant';
import { Users } from 'src/modules/users/entities/user.entity';
import { PaginatedQueryDto } from 'src/common-modules/swagger-docs/paginate-query.dto';

@Injectable()
export class AdminsServiceAdmin {
  constructor(
    @InjectRepository(Admins)
    private adminsRepository: Repository<Admins>,
    private readonly _dataSource: DataSource,
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const existingUsersInAdmin = await this.adminsRepository.findOne({
      where: {
        email: createAdminDto.email,
      },
    });

    if (existingUsersInAdmin)
      throw new ConflictException('user exists with this email');

    const existingUsersInUsers = await this._dataSource.manager.findOne(Users, {
      where: {
        email: createAdminDto.email,
      },
    });

    if (existingUsersInUsers)
      throw new ConflictException('user exists with this email');

    const preparedData = await this.prepareDataToCreateAdmin(createAdminDto);
    const admin = this.adminsRepository.create(preparedData);

    await this.adminsRepository.save(admin);

    delete admin.password;

    return admin;
  }

  async findAll(queryParams: PaginatedQueryDto) {
    const sorting = {};
    const validSortKeys: (keyof Admins)[] = [
      'id',
      'createdAt',
      'deletedAt',
      'email',
      'name',
    ];

    console.log(queryParams);

    if (validSortKeys.includes(queryParams.sortField as keyof Admins)) {
      sorting[queryParams.sortField] = queryParams.sortOrder ?? 'DESC';
    }

    const currentPage =
      +(queryParams.page ?? 1) > 1 ? +(queryParams.page ?? 1) : 1;
    const limit = +(queryParams.limit ?? 10);
    const offset = (currentPage - 1) * limit;

    const data = await this.adminsRepository.findAndCount({
      select: {
        id: true,
        name: true,
        email: true,
        role: {
          id: true,
          role: true,
        },
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
      order: { ...sorting },
      take: limit,
      skip: offset,
      relations: {
        role: true,
      },
    });

    return data;
  }

  async findOne(id: number) {
    const admin = await this.adminsRepository.findOne({
      where: {
        id,
      },
      select: {
        role: {
          id: true,
          role: true,
        },
      },
      relations: {
        role: true,
      },
    });

    delete admin.password;

    return admin;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  async prepareDataToCreateAdmin(createAdminDto: CreateAdminDto) {
    const adminRole = await this._dataSource.manager.findOne(Roles, {
      where: {
        role: UserRole.ADMIN,
      },
      select: {
        id: true,
        role: true,
      },
    });

    return {
      name: createAdminDto.name,
      email: createAdminDto.email,
      password: createAdminDto.password,
      role: adminRole,
    };
  }
}
