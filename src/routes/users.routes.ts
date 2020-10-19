import { Router } from "express"

import CreateUserService from "../services/CreateUserService";

const routes = Router()

routes.post("/", async (request, response) => {
    const { name, email, password } = request.body

    try {
        const createUserService = new CreateUserService()

        const user = await createUserService.execute({
            name,
            email,
            password
        })
        
        delete user.password;
        
        return response.json(user)
    } catch (error) {
        return response.status(400).json({error})
    }
})

export default routes