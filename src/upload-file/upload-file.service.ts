require('dotenv').config()
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { FileRepository } from './upload-file.repository';



export class UploadFileService {
   constructor( @InjectRepository(FileRepository)
   
   private filerepositry:FileRepository,
   
   ){}
async uploadfile(
    File:Express.Multer.File,
    user:User
    
){
    console.log(File)
     return this.filerepositry.uploadfile(File,user);

}
async GetallFiles(
    user:User
){
    return this.filerepositry.GetallFiles(user)
}
async getfilebyid(
    id:number,
    user:User
){
    const found = await this.filerepositry.findOne(id);
    console.log(found)
    if(found.id === user.files.find(x => found.id === id).id){
        try{
            console.log(process.env.BASE_URL)
            return `${process.env.BASE_URL}${found.filename}`;
            
        }
        catch(error){
            throw new error; 

        }

        }
    // if(found.id !== user.files.find(x =>found.id === id).id){
    //     throw new NotFoundException(`file with id: "${id}" not found`);

    // }
        

    
}
}
