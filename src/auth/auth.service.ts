import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

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
        const username = await this.userRepository.validateUserPassword(authCredentialsDto)
        if(!username){
            throw new UnauthorizedException('Invalid credantials')
        }
        const payload:JwtPayload ={username};
        const accessToken = await this.jwtservice.sign(payload)
        
        return {accessToken}
    }

}
