import { Router } from "express"

import AuthService from "../services/AuthService";

const routes = Router() 

routes.post("/", async (request, response) => {
    const { email, password } = request.body

    try {
        const authService = new AuthService()
 
        const user = await authService.execute({
            email,
            password
        })

        return response.json(user)
    } catch (error) {
        return response.status(400).json({error})
    }
})

export default routes