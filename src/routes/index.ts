import { Router } from "express"

import appointmentsRouter from "./appointments.routes";
import usersRouter from "./users.routes";
import sessionsRouter from "./sessions.routes";
import profileRouter from "./profile.routes";

import ensureAuth from "../middlewares/ensureAuth"

const routes = Router()
 
routes.use("/users", usersRouter)
routes.use("/sessions", sessionsRouter)

routes.use(ensureAuth)
routes.use("/profile", profileRouter)
routes.use("/appointments", appointmentsRouter)


export default routes
