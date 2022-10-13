import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@prisma/client';
import { ApprovedReportDto } from './dtos/apporved-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  create(reportDto: CreateReportDto, user: User) {
    return this.prisma.report.create({
      data: {
        ...reportDto,
        user: {
          connect: { id: user.id },
        },
      },
    });
  }

  // createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
  //   return this.repo
  //     .createQueryBuilder()
  //     .select('AVG(price)', 'price')
  //     .where('make = :make', { make })
  //     .andWhere('model = :model', { model })
  //     .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
  //     .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
  //     .andWhere('year - :year BETWEEN -3 AND 3', { year })
  //     .andWhere('approved IS TRUE')
  //     .orderBy('ABS(mileage - :mileage)', 'DESC')
  //     .setParameters({ mileage })
  //     .limit(3)
  //     .getRawOne();
  // }

  findOne(id: number) {
    if (!id) {
      throw new NotFoundException('Please provide a report id');
    }
    return this.prisma.report.findUnique({ where: { id } });
  }

  async findOneOrThrow(id: number) {
    const report = await this.findOne(id);
    if (!report) {
      throw new NotFoundException('No report was found');
    }
    return report;
  }

  async changeApproval(id: number, approved: boolean) {
    return this.prisma.report.update({
      where: { id },
      data: {
        approved,
      },
    });
  }
}
