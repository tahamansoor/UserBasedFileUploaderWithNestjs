import { Controller, Get,ParseIntPipe, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { PassportModule } from '@nestjs/passport';
import { UploadFileService } from './upload-file.service';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { diskStorage } from 'multer';
import { extname } from 'path';



@UseGuards(AuthGuard('jwt'))
@Controller('file')
export class UploadFileController {
    constructor(private uploadfilesevices:UploadFileService){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file',
      {
        storage: diskStorage({
          destination: './upload', 
           filename: function ( req, file, cb ) {
            //req.body is empty...
            cb( null, file.originalname );
        }})
      }
    )
    )
    uploadFile(@UploadedFile() file: Express.Multer.File,
    @GetUser() user:User
    ) {
    return this.uploadfilesevices.uploadfile(file,user)
    }
    @Get('/getfiles')
    async GetFiles(
        @GetUser() user:User
    ){
        return this.uploadfilesevices.GetallFiles(user)


    }
    @Get('search')
    async getfilebyid(@Query('id',ParseIntPipe)id:number,
     @GetUser() user:User){
        return this.uploadfilesevices.getfilebyid(id,user)

    }
}
  