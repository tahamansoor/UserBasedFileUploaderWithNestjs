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
    console.log(user)
    const file = user.files
    let checkpoint = 0;
    file.forEach(element =>{
        if(element.id == id){
            checkpoint = 1
        }
    })
    console.log(id)
    console.log(file)
    if(found && checkpoint>0){
        try{
            return found;
            
        }
        catch(error){
              error; 

        }

        }

    
}
}
