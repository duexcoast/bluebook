import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { User } from './user.entity';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(email: string, password: string) {
    return this.prisma.user.create({ data: { email, password } });
  }

  findOne(id: number) {
    if (!id) {
      throw new NotFoundException('Please provide a userId');
    }
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findOneOrThrow(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('No user was found');
    }
    return user;
  }

  findByEmail(email: string) {
    if (!email) {
      throw new NotFoundException('Please provide an email');
    }
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findByEmailOrThrow(email: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('No user was found');
    }
    return user;
  }

  async update(id: number, attrs: UpdateUserDto) {
    const updatedReport = await this.prisma.user.update({
      where: { id },
      data: attrs,
    });
    if (!updatedReport) {
      throw new NotFoundException('Could no locate a user with that id')
    }
    return updatedReport
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
