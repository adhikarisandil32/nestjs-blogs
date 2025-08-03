import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PaginatedQueryDto } from 'src/common-modules/swagger-docs/paginate-query.dto';
import { Repository } from 'typeorm';
import { Roles } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { findAllPaginatedData } from 'src/common-modules/utils/functions/common-query';
import { UserRole } from 'src/constants/user-roles.constant';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const existingRoles = await this.rolesRepository.findOne({
      where: {
        role: createRoleDto.name.toLowerCase() as UserRole,
      },
    });

    if (existingRoles) {
      throw new ConflictException('role already exists');
    }

    const preparedRolesData = this.rolesRepository.create({
      role: createRoleDto.name as UserRole,
    });

    await this.rolesRepository.save(preparedRolesData);

    return preparedRolesData;
  }

  async findPaginated(queryParams: PaginatedQueryDto) {
    const data = await findAllPaginatedData<Roles>({
      ...queryParams,
      repo: this.rolesRepository,
      validSearchFields: ['role'],
      validSortFields: ['role', 'createdAt'],
      queryOptions: {},
    });

    return data;
  }

  async findOne(id: number) {
    return await this.rolesRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const preparedUpdateRoleData = this.rolesRepository.create({
      role: updateRoleDto.name as UserRole,
    });

    const afterUpdate = await this.rolesRepository.update(
      id,
      preparedUpdateRoleData,
    );

    let newData: Roles;
    if (afterUpdate.affected > 0) {
      newData = await this.rolesRepository.findOne({ where: { id } });
    }

    return newData;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
