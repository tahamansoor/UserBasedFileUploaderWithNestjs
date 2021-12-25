require('dotenv').config()
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { file } from "src/upload-file/upload-file.entity";


export const typeOrmConfig: TypeOrmModuleOptions = {
// 
    type: 'mysql',
    host:process.env.HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME || 'testtask',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    entities: [User,file],
    synchronize: true
}
console.log(typeOrmConfig)