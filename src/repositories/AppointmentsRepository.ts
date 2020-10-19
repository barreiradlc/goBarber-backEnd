import Appointment from "../models/Appointment"

import { isEqual,isSameHour, isSameMinute } from "date-fns"
 
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>{

    public async findByDate(date: Date): Promise<Appointment | null>{
        // const findAppointment = this.appointments.find((appointment) => 
        //     return isEqual(date, appointment.date)
        // ) 

        const findAppointment = await this.findOne({ 
            where: { date }
         })

        return findAppointment || null
    }
 
}

export default AppointmentsRepository