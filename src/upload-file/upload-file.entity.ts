import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../auth/user.entity";
@Entity()
export class file extends BaseEntity{
    @PrimaryGeneratedColumn()
     id: number;
   
    @Column({nullable:false})
    filename: string;
    @ManyToOne(type => User, user => user.files, {eager:false})
    user:User


}