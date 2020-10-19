import { compare, hash } from "bcryptjs";
import { getRepository } from "typeorm"

import User from "../models/User"

interface Request{
    email: string;
    password: string;
}

class AuthService {
    public async execute({ email, password }: Request): Promise<User | null> {
        const usersRespository = getRepository(User);

        const user = await usersRespository.findOne({ where: { email } })

        if(!user){
            throw new Error("Incorrect email/password combination")
        }
        
        const passwordMatched = await compare(password, user.password) 

        if(!passwordMatched){
            throw new Error("Incorrect email/password combination")
        }

        return {
            user,
            
        };
    }
}

export default AuthService