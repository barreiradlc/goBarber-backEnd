import { Router } from "express"

import CreateUserService from "../services/CreateUserService";

const routes = Router()

routes.post("/", async (request, response) => {
    const { name, email, password } = request.body

        const createUserService = new CreateUserService()

        const user = await createUserService.execute({
            name,
            email,
            password
        })
        
        delete user?.password;
        
        return response.json(user)
    
})

export default routes