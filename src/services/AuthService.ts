import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm"
import auth from "../config/auth";
import AppError from "../errors/AppError"

import AuthConfig from "../config/auth"
import User from "../models/User"

interface Request{
    email: string;
    password: string;
}

interface Response{
    user: User;
    token: string
}

class AuthService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRespository = getRepository(User);

        const user = await usersRespository.findOne({ where: { email } })

        if(!user){
            throw new AppError("Incorrect email/password combination", 401)
        }
        
        const passwordMatched = await compare(password, user.password) 

        if(!passwordMatched){
            throw new AppError("Incorrect email/password combination", 401)
        }

        const { secret, expiresIn } = AuthConfig.jwt

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        })

        return {
            user,
            token
        };
    }
}

export default AuthService