import { Router } from "express"
import { uuid } from "uuidv4"
import { startOfHour, parseISO, isEqual } from "date-fns"

import { getCustomRepository } from "typeorm";

import Appointment from "../models/Appointment"
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

const routes = Router() 

routes.get("/", async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
})

routes.post("/", async (request, response) => {
    const { provider_id, date } = request.body

        const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    
        const parsedDate = parseISO(date);
        const appointmentDate = startOfHour(parsedDate)
    
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);
    
        if(findAppointmentInSameDate){
            return response.status(400).json({ message: "Appointment already booked" })
        }
    
        const createAppointmentService = new CreateAppointmentService()
    
        const appointment = await createAppointmentService.execute({date: appointmentDate, provider_id })
    
        return response.json(appointment);
    
})

export default routes