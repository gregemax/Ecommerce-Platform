import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from "dotenv"


dotenv.config({path:"./.env"})
console.log(process.env.username);

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres"||"mysql",
  host: process.env.host||'localhost',
  port:6543||3306,
  username:process.env.usernamedb|| 'root',
  password: process.env.passworddb||'gregemax700@gmail.com',
  //validate:false,
  database:process.env.database|| 'ecommerceplatform',
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
