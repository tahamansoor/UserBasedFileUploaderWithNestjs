import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { file } from "src/upload-file/upload-file.entity";


@Entity()
@Unique(['username'])
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username:string;

    @Column()
    password:string;

    @Column({nullable: true})
    salt:string;
    @OneToMany(type => file,file => file.user, {eager:true})
    files:file[];

    async validatepassword(password:string):Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password;

    }

    
}