import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'gregemax700@gmail.com',
  //validate:false,
  database: 'ecommerceplatform',
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
