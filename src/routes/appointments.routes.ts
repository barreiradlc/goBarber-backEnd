import { Router } from "express"
import { uuid } from "uuidv4"
import { startOfHour, parseISO, isEqual } from "date-fns"

import Appointment from "../models/Appointment"
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

const routes = Router() 

const appointmentsRepository = new AppointmentsRepository()

routes.get("/", (request, response) => {
    const appointments = appointmentsRepository.all();

    return response.json(appointments);
})

routes.post("/", (request, response) => {
    const { provider, date } = request.body

    try {
        
        
            const parsedDate = parseISO(date);
            const appointmentDate = startOfHour(parsedDate)
        
            const findAppointmentInSameDate = appointmentsRepository.findByDate(appointmentDate);
        
            if(findAppointmentInSameDate){
                return response.status(400).json({ message: "Appointment already booked" })
            }
        
            const createAppointmentService = new CreateAppointmentService(appointmentsRepository)
        
            const appointment = createAppointmentService.execute({date: appointmentDate, provider})
        
            return response.json(appointment);
    } catch (error) {
        return response.status(400).json({error})
    }
})

export default routes