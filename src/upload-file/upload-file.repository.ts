require('dotenv').config()
import { EntityRepository, Repository } from "typeorm";
import { file } from "./upload-file.entity";
import {uploadfiledto} from 'src/upload-file/upload-file.dto'
import { User } from "src/auth/user.entity";
// type NewType = User;


@EntityRepository(file)
export class FileRepository extends Repository<file>{
    async uploadfile(
        File:Express.Multer.File,
        user:User,
    ): Promise<void>{


        
        const ile = new file();


        console.log(File)
        ile.filename = File.originalname
        ile.user = user
        ile.link = `${process.env.BASE_URL}${File.originalname}`
        console.log(ile.link)

    //saving changes in enitiy
        await ile.save();

        console.log(ile);


    }
    async GetallFiles(
        user:User
    ){
    //returning user files
        return user.files

    }
}