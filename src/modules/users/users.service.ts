import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.insert(createUserDto);

      return {
        message: 'User Creation success',
        status: 200,
        success: true,
        data: createUserDto,
      };
    } catch (error) {
      return {
        message: error.message,
        success: false,
        data: null,
      };
    }
  }

  async findAll() {
    try {
      const users = await this.usersRepository.find({
        select: {
          createdAt: true,
          deletedAt: true,
          updatedAt: true,
          email: true,
          id: true,
          name: true,
        },
      });

      return {
        message: 'User Listing success',
        status: 200,
        success: true,
        data: users,
      };
    } catch (error) {
      return {
        message: error.message,
        success: false,
        data: null,
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
