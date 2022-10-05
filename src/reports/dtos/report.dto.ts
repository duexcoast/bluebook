import { Expose, Transform, Type } from 'class-transformer';
import { UserDto } from '../../users/dtos/user.dto';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  mileage: number;

  @Expose()
  approved: boolean;

  @Expose()
  @Type(() => UserDto)
  userId: number;
}
