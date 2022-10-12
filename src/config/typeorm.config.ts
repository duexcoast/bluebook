import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { dirname } from 'path';
import { DatabaseType } from 'typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    let options: TypeOrmModuleOptions = {
      database: this.configService.get<string>('DB_NAME'),
      synchronize: this.configService.get<boolean>('DB_SYNCHRONIZE'),
      autoLoadEntities: true,
      migrationsRun: this.configService.get<boolean>('DB_MIGRATIONS_RUN'),
      // logging: this.configService.get('DB_LOGGING'),
      entities: [__dirname + 'src/**/*{.entity.ts,.entity.js}'],
      migrations: [__dirname + './migrations/*{.ts,.js}'],
    };

    if (process.env.NODE_ENV = "development") {
      options = Object.assign(options, {
        type: ''
      })
    }

    // return options;
  }
}
