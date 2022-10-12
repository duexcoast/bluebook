// import { Report } from '@prisma/client';
// import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// import { UserEntity } from '../users/user.entity';

// @Entity()
// export class ReportEntity implements Report {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ default: false })
//   approved: boolean;

//   @Column()
//   price: number;

//   @Column()
//   make: string;

//   @Column()
//   model: string;

//   @Column()
//   year: number;

//   @Column()
//   lng: number;

//   @Column()
//   lat: number;

//   @Column()
//   mileage: number;

//   @ManyToOne(() => User, (user) => user.reports)
//   user: UserEntity;
// }
