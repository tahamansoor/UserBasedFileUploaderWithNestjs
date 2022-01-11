import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor( @InjectRepository(UserRepository)
     private userRepository: UserRepository,
     private jwtservice: JwtService,
     ){}

    async signUP(authCredentialsDto:AuthCredentialsDto):Promise<void>{
        return await this.userRepository.signUP(authCredentialsDto)

    }
    async signIn(authCredentialsDto:AuthCredentialsDto):Promise<{accessToken:string}>{
        const user = await this.userRepository.findOne({username:authCredentialsDto.username})
        if(user && await bcrypt.compare(authCredentialsDto.password,user.password) ){
            const payload:JwtPayload = {...user};
        const accessToken = await this.jwtservice.sign(payload)
        console.log(await bcrypt.compare(authCredentialsDto.password,user.password))
        
        return {accessToken}
            
        }
    }

}
