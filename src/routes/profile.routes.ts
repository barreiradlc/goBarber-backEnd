import { Router } from "express"
import multer from "multer"
import UploadConfig from "../config/upload"
import UpdateUserAvatarService from "../services/UpdateUserAvatarService"

const upload  = multer(UploadConfig)

const routes = Router()

routes.patch("/avatar", upload.single("avatar"), async (request, response) => {
    
        const updateUserAvatarService = new UpdateUserAvatarService()
        const { filename } = request.file

        const user = await updateUserAvatarService.execute({
            user_id: request.user.id,
            avatarFilename: filename
        })

        delete user.password 

        return response.json(user)

})

export default routes