import { hash } from "bcryptjs";
import { getRepository } from "typeorm"

import User from "../models/User"

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    public async execute({name, email, password}: Request): Promise<User> {
        const usersRespository = getRepository(User);

        const checkUserExists = await usersRespository.findOne({
            where: { email }
        })

        if(checkUserExists){
            throw new Error("Email adress already taken")
        }


        const hashdPassword = await hash(password, 8)

        const user = usersRespository.create({
            name,
            email,
            password: hashdPassword
        })

        console.log({user2: user})

        console.log({user})

        await usersRespository.save(user)

        return user;
    }
}

export default CreateUserService