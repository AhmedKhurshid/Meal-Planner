import { argon } from "core/constant";
import { User } from "core/entities";
import { GENDER, ROLE, STATUS } from "core/enums";
import { Connection} from "typeorm";
import { Factory, Seeder } from "typeorm-seeding"; 

export default class CreateLawyerSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const insert = connection.createQueryBuilder().insert();
    const student = await insert.into(User).values({ 
      name: 'Student', 
      // mobile: '03212825500',
      email: 'ssyedahmed31@gmail.com',  
      password: await argon.hash('Password@123'),
      gender: GENDER.MALE, 
      role: ROLE.STUDENT,
      status: STATUS.ACTIVE,
      // desc: 'Student Desc', 
      address:'Student Address',  
      image: 'Student-image.jpg',
      // city: CITY.KARACHI,
    }).execute()
    console.log({student});
  
  }
}