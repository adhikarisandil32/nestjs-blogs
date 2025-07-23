import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import { Repository } from 'typeorm';
import { Admins } from '../entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdminsServiceAdmin {
  constructor(
    @InjectRepository(Admins)
    private adminsRepository: Repository<Admins>,
  ) {}
  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admins`;
  }

  async findOne(id: number) {
    return this.adminsRepository.findOne({
      where: {
        id,
      },
      select: {
        createdAt: true,
        deletedAt: true,
        email: true,
        id: true,
        name: true,
        updatedAt: true,
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

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
