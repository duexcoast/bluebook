import 'reflect-metadata';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

config();

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['src/**/*.entity.ts'],
  migrations: [join(__dirname, './migrations/*.ts')],
  cli: {
    migrationsDir: 'src/migrations',
  },
} as DataSourceOptions);

export const postgresDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    console.log(process.env.DB_TYPE);
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
