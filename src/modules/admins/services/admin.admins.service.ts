import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import { DataSource, Repository } from 'typeorm';
import { Admins } from '../entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/modules/roles/entities/role.entity';
import { UserRole } from 'src/constants/user-roles.constant';
import { Users } from 'src/modules/users/entities/user.entity';

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

  async findAll() {
    return await this.adminsRepository.find({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        name: true,
        email: true,
        role: {
          id: true,
          role: true,
        },
      },
      relations: {
        role: true,
      },
    });
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
