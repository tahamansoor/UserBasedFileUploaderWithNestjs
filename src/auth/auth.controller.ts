import { Body, Controller, Post,ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')

export class AuthController {
    constructor(
        private authservice : AuthService,
    ){}


    @Post('/signup')
    signUP(@Body(ValidationPipe)authCredentialsDto:AuthCredentialsDto):Promise<void>{
     return this.authservice.signUP(authCredentialsDto)


    }
    
    
    @Post('/signin')
    signIn(@Body(ValidationPipe)authCredentialsDto:AuthCredentialsDto):Promise<{accessToken:string}>{
        return this.authservice.signIn(authCredentialsDto)    }
}
