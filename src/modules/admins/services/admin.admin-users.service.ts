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
import { findAllPaginatedData } from 'src/common-modules/utils/functions/common-query';
import { CommonUser } from 'src/modules/common-users/entities/common-user.entity';

@Injectable()
export class AdminsServiceAdmin {
  constructor(
    @InjectRepository(Admins)
    private adminsRepository: Repository<Admins>,
    private readonly _dataSource: DataSource,
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const [existingUsersInAdmin, existingUsersInUsers] = await Promise.all([
      this.adminsRepository.findOne({
        where: {
          email: createAdminDto.email,
        },
      }),
      this._dataSource.manager.findOne(Users, {
        where: {
          email: createAdminDto.email,
        },
      }),
    ]);

    if (existingUsersInAdmin || existingUsersInUsers)
      throw new ConflictException('user exists with this email');

    const preparedData = await this.prepareDataToCreateAdmin(createAdminDto);
    const admin = this.adminsRepository.create(preparedData);
    const commonUser = this._dataSource.manager.create(
      CommonUser,
      preparedData,
    );

    await Promise.all([
      this.adminsRepository.save(admin),
      this._dataSource.manager.save(CommonUser, commonUser),
    ]);

    return admin;
  }

  async findAllPaginated(queryParams: PaginatedQueryDto) {
    const data = await findAllPaginatedData<Admins>({
      ...queryParams,
      repo: this.adminsRepository,
      validSearchFields: ['email', 'name'],
      validSortFields: ['email', 'name', 'createdAt'],
      queryOptions: {
        select: {
          role: {
            id: true,
            role: true,
          },
        },
        relations: {
          role: true,
        },
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

    return admin;
  }

  async update({
    admin,
    updateAdminDto,
  }: {
    admin: Admins;
    updateAdminDto: UpdateAdminDto;
  }) {
    const preparedUpdate = this.adminsRepository.create(updateAdminDto);

    await Promise.all([
      this.adminsRepository.update(admin.id, preparedUpdate),
      this._dataSource.manager.update(
        CommonUser,
        { email: admin.email },
        preparedUpdate,
      ),
    ]);

    const updatedData = await this.adminsRepository.findOne({
      where: {
        id: admin.id,
      },
      select: {
        id: true,
        role: true,
      },
      relations: {
        role: true,
      },
    });

    return updatedData;
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
