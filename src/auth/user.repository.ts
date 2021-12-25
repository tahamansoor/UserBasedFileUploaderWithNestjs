import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";


@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUP(authCredentialsDto:AuthCredentialsDto): Promise<void> {
        const { username, password} = authCredentialsDto

        
        const user = new User();

        user.username = username;

        user.salt = await bcrypt.genSalt();

        user.password = await this.HashPassword(password,user.salt);

        try{
            await user.save();
        }
        catch(error){
            if(error.code === '23505') {// will throw an error if username match with other
                throw new ConflictException('User name already exists')

            }else{
                throw new InternalServerErrorException();
            }
        }
        
    }

    async validateUserPassword(authCredentialsDto:AuthCredentialsDto){
        const {username,password} = authCredentialsDto
        const user = await this.findOne({username})

        if(user && user.validatepassword(password)){
            return user.username;

        }else{
            return null;
        }

    }

    

    private async HashPassword(password:string, salt:string):Promise<string>{
        return await bcrypt.hash(password,salt)
    
    }


}