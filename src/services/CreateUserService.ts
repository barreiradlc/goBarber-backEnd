import { hash } from "bcryptjs";
import { getRepository } from "typeorm"
import AppError from "../errors/AppError";

import User from "../models/User"

interface Request {
    name: string;
    email: string;
    password?: string;
}

class CreateUserService{
    public async execute({name, email, password}: Request): Promise<User> {
        const usersRespository = getRepository(User);

        const checkUserExists = await usersRespository.findOne({
            where: { email }
        })

        if(checkUserExists){
            throw new AppError("Email adress already taken")
        }

        const hashdPassword = await hash(String(password), 8)

        const user = usersRespository.create({
            name,
            email,
            password: hashdPassword
        })

        await usersRespository.save(user)

        return user;
    }
}

export default CreateUserService