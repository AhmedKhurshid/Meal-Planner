import { argon } from "core/constant";
import { User } from "core/entities";
// import { CITY, GENDER, ROLE, STATUS } from "core/enums";
import { Connection} from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class CreateLawyerWorkRoleBasedSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const insert = connection.createQueryBuilder().insert();
    // const lawyerTeam = await insert.into(User).values({ 
    //   name: 'Student', 
    //   mobile: '03212825500',
    //   email: 'lawyerteam@gmail.com',  
    //   password: await argon.hash('Password@123'),
    //   gender: GENDER.MALE,
    //   role: ROLE.TEAM,
    //   status: STATUS.ACTIVE,
    //   image: 'lawyer-team-image.jpg',
    //   address: 'karachi'
    // }).execute()
    // console.log({lawyerTeam});
    // const lawyerClient = await insert.into(User).values({ 
    //   name: 'LawyerClient', 
    //   mobile: '03212825500',
    //   email: 'lawyerClient@gmail.com',  
    //   password: await argon.hash('Password@123'),
    //   gender: GENDER.MALE,
    //   role: ROLE.CLIENT_LAWYER,
    //   status: STATUS.NONE,
    //   image: 'lawyer-client-image.jpg',
    //   address: 'karachi',
    //   city: CITY.KARACHI
    // }).execute()
    // console.log({lawyerClient});

  

  }
}