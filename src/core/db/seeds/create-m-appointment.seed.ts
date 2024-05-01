import { User } from "core/entities";
import { GENDER, ROLE } from "core/enums";
import { Connection} from "typeorm";
import { Factory, Seeder } from "typeorm-seeding"; 

export default class CreateMAppointmentSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const insert = connection.createQueryBuilder().insert();
    // await insert.into(Appoinment).values({
    //   id: 5,
    //   title: 'Appointment',
    //   desc: 'Appointment desc',
    //   date: '20-06-2023',
    //   time: '03:00pm',
    //   status:STATUS_APPOINT.PENDING,
    //   feedback: '',
    //   lawyerId: 2
    // }).execute()
  }
}