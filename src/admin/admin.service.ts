import { HttpStatus, Injectable } from '@nestjs/common';
import { RESPOSE_CODE_MESSAGE, ROLE, STATUS } from 'core/enums';
import { CoreService } from 'core/service';
import { ChangeStatusDto } from './dto/admin.dto';
import { AdminLawyerDto } from './dto/adminLawyer.dto';
import { ResponseData } from 'core/common/ResponseModel';
import {
  argon,
  generateLawyerPassword,
  searalizeUser,
  throwForbiddenException,
  throwForbiddenExceptionFoodAllergies,
  throwForbiddenExceptionName,
  throwForbiddenExceptionTimeScheduleId,
  throwForbiddenExceptionTypeNotFound,
  throwForbiddenExceptionUser,
} from 'core/constant';
import { User } from 'core/entities';
// import { In } from 'typeorm';
// import { DashoardDetail } from './responseModel/dasboardModel';
import { PageOptionsDto } from './dto/pageOption.dto';
import { PageMetaDto } from './dto/pageMeta.dto';
import { Service } from 'core/entities/service.entity';
import { CreateDto } from 'core/base';
import { Notification } from 'core/entities/notification.entity';
// import { CreateStudentDto } from 'feature/student/dto/create-student.dto';
import { UpdateStudentDto } from 'feature/student/dto/update-student.dto';

@Injectable()
export class AdminService extends CoreService {
  private userSelectiveColumns = {
    name: true,
    email: true,
    gender: true,
    phone: true,
    image: true,
    role: true,
    status: true,
    // city: true,
  };
  async changeStatusUser({ status }: ChangeStatusDto, id: number) {
    const res = new ResponseData();

    const user = await this.repos.user.findOneBy({ id });
    throwForbiddenExceptionUser(user);
    try {
      await this.repos.user.update(id, { status });
      // this.mail.lawyerAccountActivation({ name: user.name, to: user.email })

      res.statusCode = HttpStatus.OK;
      res.message = [RESPOSE_CODE_MESSAGE.UPDATE];
      return res;
    } catch (e) {}
  }

  async updateStudentInfo(data: UpdateStudentDto, id: number) {
    const res = new ResponseData();

    const existUser = await this.repos.user.findOneBy({ id });
    throwForbiddenExceptionUser(existUser);
    
    const existStudent = await this.repos.student.findOneBy({ userId:existUser.id });
    
    const existAllergies = await this.repos.foodAllergies.findOneBy({ id: data.allergiesId });
    throwForbiddenExceptionFoodAllergies(existAllergies);
    // console.log('existStudent');
    // console.log(existAllergies);

    const existType = await this.repos.type.findOneBy({ id: data.typeId });
    throwForbiddenExceptionTypeNotFound(existType);
    
    const existTimeschedule = await this.repos.orderTime.findOneBy({ id: data.timeScheduleId });
    throwForbiddenExceptionTimeScheduleId(existTimeschedule);

    try {
      if (existUser) {
        await this.repos.user.update(id, {
          name: data.name,
          gender: data.gender,
          phone: data.phone,
          address: data.address,
          image: data.image,
          externalId: data.externalId,
          role: data.role,
          paymentMethod: data.paymentMethod,
        });

        await this.repos.student.update(existStudent.id, {
          secPhone: data.secPhone,
          allergiesId: existAllergies.id,
          typeId: existType.id,
          timeScheduleId: existTimeschedule.id,
          balance: data.balance,
        });
        
        res.statusCode = HttpStatus.OK;
        res.message = [RESPOSE_CODE_MESSAGE.UPDATE];
        return res;
      } else {
        res.statusCode = HttpStatus.NOT_FOUND;
        res.message = [RESPOSE_CODE_MESSAGE.USERNOTFOUND];
        return res;
      }
    } catch (e) {}
  }

  async getLawyers() {
    const res = new ResponseData();

    const lawyer = await this.repos.user.find({
      where: { role: ROLE.STUDENT },
      select: this.userSelectiveColumns,
    });
    if (lawyer.length == 0) {
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.message = [RESPOSE_CODE_MESSAGE.LAWYERREQUEST];
      return res;
    }

    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    res.data = lawyer;
    return res;
  }

  async getLawyer(id: number) {
    const res = new ResponseData();
    // const vendor = await this.repos.type.findOneBy({ id });

    const user = await this.repos.user.findOneBy({
      id,
      role: ROLE.STUDENT || ROLE.STAFF,
    });
    const student = await this.repos.student.findOneBy({
      userId :id,
    });
    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    res.data = {user,student};
    return res;
  }

  // async causeListAdmin({ courtId, nexthearing, lawyerId }) {
  //   const result = await this.repos.lawyerCase.findBy({ courtId, nexthearing, lawyerId })
  //   if (result?.length) return result
  //   else return { message: 'Data Not found' }
  // }
  // async sendEmail({ to, subject, html }) {
  //   await this.mail.adminEmail({ to, subject, html })
  // }

  async signUpLawyer(data: AdminLawyerDto): Promise<any> {
    const res = new ResponseData();

    const existUser = await this.repos.user.findOneBy({ email: data.email });
    throwForbiddenException(existUser);

    // const specialization = await this.repos.specialization.findOneBy({ id: data.specializationId });
    // throwForbiddenExceptionSpecialization(specialization);

    const user: User = searalizeUser(data, ROLE.STUDENT, STATUS.ACTIVE);
    const password = 'KLP' + (await generateLawyerPassword());
    console.log('password', password);
    const hashResult = await argon.hash(password);
    user.password = hashResult;

    try {
      // const createUser = this.repos.user.create(user);
      // const userId = await this.repos.user.save(createUser);

      // this.mail.lawyerAccountActivation({})
      const { email, id, name } = user;
      const result = { id, email, name };

      res.statusCode = HttpStatus.OK;
      res.message = [RESPOSE_CODE_MESSAGE.REGISTERSUCCESSFULL];
      res.data = result;
      return res;
      // return this.returnGeneratedToken(lawyer.user);
    } catch (e) {
      // TODO: if mail doesn't sent then drop the data maybe
    }
  }

  // async getDasboard(): Promise<ResponseData<DashoardDetail>> {
  //   const lawyer = await this.repos.user.count({
  //     where: {
  //       role: ROLE.LAWYER
  //     }
  //   });
  //   const book = await this.repos.book.count();
  //   const cases = await this.repos.casez.count();
  //   const news = await this.repos.news.count();
  //   const appointment = await this.repos.appointment.count();

  //   // eslint-disable-next-line prefer-const
  //   let dashoardDetail = new DashoardDetail();
  //   dashoardDetail.lawyer = lawyer,
  //     dashoardDetail.cases = cases,
  //     dashoardDetail.news = news,
  //     dashoardDetail.book = book,
  //     dashoardDetail.appointment = appointment

  //   const res = new ResponseData<DashoardDetail>();
  //   res.statusCode = HttpStatus.OK;
  //   res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
  //   res.data = dashoardDetail;
  //   return res;
  // }

  // async getLawyersRequest() {
  //   const res = new ResponseData();

  //   const lawyer = await this.repos.user.find({
  //     where: { role: ROLE.LAWYER, status: STATUS.PENDING },
  //     select: {
  //       name: true,
  //       email: true,
  //       gender: true,
  //       phone: true,
  //       image: true,
  //       role: true,
  //       status: true,
  //       city: true,
  //       lawyer: { license: true }
  //     },
  //     relations: { lawyer: true }
  //   });

  //   if (lawyer.length == 0) {
  //     res.statusCode = HttpStatus.BAD_REQUEST;
  //     res.message = [RESPOSE_CODE_MESSAGE.LAWYERREQUEST];
  //     return res;
  //   }

  //   res.statusCode = HttpStatus.OK;
  //   res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
  //   res.data = lawyer;
  //   return res;
  // }

  public async getLawyerList(pageOptionsDto: PageOptionsDto) {
    const queryBuilder = await this.repos.user
      .createQueryBuilder('user')
      // .from('court_lawyer','court_lawyer.lawyerId  = user.id')s
      // .innerJoin(LawyerSchedule,'ls', 'ls.lawyerId = user.id').
      .where(
        'user.role =:role AND ((user.email LIKE :email OR user.name LIKE :name OR  user.mobile LIKE :mobile) AND user.status =:status)',
        {
          role: ROLE.STUDENT,
          email: `%${pageOptionsDto.search}%`,
          name: `%${pageOptionsDto.search}%`,
          phone: `%${pageOptionsDto.search}%`,
          status: pageOptionsDto.status,
        },
      )
      .select([
        'user.id as id',
        'user.name as name',
        'user.email as email',
        'user.status as status',
        'user.role as role',
        'user.gender as gender',
        'user.address as address',
        'user.city as city',
        'user.phone as phone',
        'user.image as image',
        'user.location as location',
        // "court_lawyer.courtId as courtId"
        // "l.courts"
        // "ls.days as days",
        // "ls.startTime as startTime",
        // "ls.endTime as endTime"
      ]);

    queryBuilder.orderBy('user.createdAt', pageOptionsDto.order);

    const itemCount = await queryBuilder.getCount();
    const entities = await queryBuilder.getRawMany();
    // console.log(pageOptionsDto.skip);
    // console.log(pageOptionsDto.PageSize);
    const lawyer = entities.slice(
      pageOptionsDto.skip,
      pageOptionsDto.PageSize * pageOptionsDto.pageNo,
    );

    const paginationDetail = new PageMetaDto({ itemCount, pageOptionsDto });

    const res = new ResponseData();

    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    res.data = { lawyer, paginationDetail };
    return res;
  }

  // public async getServiceFormList(pageOptionsDto: PageOptionsDto) {
  //   const queryBuilder = this.repos.serviceForm.createQueryBuilder("serviceForm")
  //     .innerJoin(Service, 's', 's.id = serviceForm.serviceId').
  //     where("(serviceForm.city LIKE :city OR serviceForm.firstName LIKE :firstName OR serviceForm.lastName LIKE :lastName OR serviceForm.mobile LIKE :mobile OR serviceForm.email LIKE :email OR serviceForm.type LIKE :type OR s.name LIKE :name)", { firstName: `%${pageOptionsDto.search}%`, city: `%${pageOptionsDto.search}%`, lastName: `%${pageOptionsDto.search}%`, mobile: `%${pageOptionsDto.search}%`, email: `%${pageOptionsDto.search}%`, type: `%${pageOptionsDto.search}%`, name: `%${pageOptionsDto.search}%` })
  //     .select([
  //       "serviceForm.id as id",
  //       "serviceForm.email as email",
  //       "serviceForm.firstName as firstName",
  //       "serviceForm.lastName as lastName",
  //       "serviceForm.city as city",
  //       "serviceForm.mobile as mobile",
  //       "serviceForm.type as type",
  //       "serviceForm.desc as description",
  //       "DATE_FORMAT(serviceForm.date,'%Y-%m-%d') as date",
  //       "serviceForm.time as time",
  //       "s.id as serviceId",
  //       "s.name as serviceName"
  //     ]);

  //   queryBuilder
  //     .orderBy("serviceForm.id", pageOptionsDto.order)

  //   const itemCount = await queryBuilder.getCount();
  //   const entities = await queryBuilder.getRawMany();
  //   // console.log(pageOptionsDto.skip);
  //   // console.log(pageOptionsDto.PageSize);
  //   const serviceForm = entities.slice(pageOptionsDto.skip, pageOptionsDto.PageSize * pageOptionsDto.pageNo);

  //   const paginationDetail = new PageMetaDto({ itemCount, pageOptionsDto });

  //   const res = new ResponseData();

  //   res.statusCode = HttpStatus.OK;
  //   res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
  //   res.data = { lawyer, paginationDetail };
  //   return res;
  // }

  public async getServiceFormList(pageOptionsDto: PageOptionsDto) {
    const queryBuilder = this.repos.serviceForm
      .createQueryBuilder('serviceForm')
      .innerJoin(Service, 's', 's.id = serviceForm.serviceId')
      .where(
        '(serviceForm.city LIKE :city OR serviceForm.firstName LIKE :firstName OR serviceForm.lastName LIKE :lastName OR serviceForm.phone LIKE :phone OR serviceForm.email LIKE :email OR serviceForm.type LIKE :type OR s.name LIKE :name)',
        {
          firstName: `%${pageOptionsDto.search}%`,
          city: `%${pageOptionsDto.search}%`,
          lastName: `%${pageOptionsDto.search}%`,
          phone: `%${pageOptionsDto.search}%`,
          email: `%${pageOptionsDto.search}%`,
          type: `%${pageOptionsDto.search}%`,
          name: `%${pageOptionsDto.search}%`,
        },
      )
      .select([
        'serviceForm.id as id',
        'serviceForm.email as email',
        'serviceForm.firstName as firstName',
        'serviceForm.lastName as lastName',
        'serviceForm.city as city',
        'serviceForm.phone as phone',
        'serviceForm.type as type',
        'serviceForm.desc as description',
        "DATE_FORMAT(serviceForm.date,'%Y-%m-%d') as date",
        'serviceForm.time as time',
        's.id as serviceId',
        's.name as serviceName',
      ]);

    queryBuilder.orderBy('serviceForm.id', pageOptionsDto.order);

    const itemCount = await queryBuilder.getCount();
    const entities = await queryBuilder.getRawMany();
    // console.log(pageOptionsDto.skip);
    // console.log(pageOptionsDto.PageSize);
    const serviceForm = entities.slice(
      pageOptionsDto.skip,
      pageOptionsDto.PageSize * pageOptionsDto.pageNo,
    );

    const paginationDetail = new PageMetaDto({ itemCount, pageOptionsDto });

    const res = new ResponseData();

    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    res.data = { serviceForm, paginationDetail };
    return res;
  }

  // public async getAge() {

  // // let age:any=null
  // const res = new ResponseData();
  // const today = new Date();
  // const birthday=new Date('2005-10-06')//here i am getting the dob value
  //   let age = today.getFullYear() - birthday.getFullYear();
  //   const m = today.getMonth() - birthday.getMonth();
  //   if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
  //       age--;
  //   }
  //   console.log("getage ", age);
  //   if(age < 18){
  //     res.statusCode = HttpStatus.OK;
  //     res.message = [RESPOSE_CODE_MESSAGE.SUCCESSFULL];
  //     return res
  //   }

  //   res.statusCode = HttpStatus.OK;
  //   res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
  //   res.data = { age }
  //   return res;
  // }

  async createNotification(body: CreateDto) {
    const existName = await this.repos.notification.findOneBy({
      title: body.title,
    });
    throwForbiddenExceptionName(existName);

    const notif: Notification = {
      title: body.title,
      // desc: body.desc
    };

    const create = this.repos.notification.create(notif);
    await this.repos.notification.save(create);

    const res = new ResponseData();
    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    return res;
  }

  async deleteNotification(id: number) {
    const res = new ResponseData();
    const exist = await this.repos.notification.findOneBy({ id: id });
    if (!exist) {
      res.statusCode = HttpStatus.OK;
      res.message = [RESPOSE_CODE_MESSAGE.NOTIFICATION];
      return res;
    }
    await this.repos.notification.delete(id);
    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.DELETE];
    return res;
  }

  public async getNotificationList(pageOptionsDto: PageOptionsDto) {
    const queryBuilder = await this.repos.notification
      .createQueryBuilder('notification')
      .where('(notification.title LIKE :title)', {
        title: `%${pageOptionsDto.search}%`,
      })
      .select([
        'notification.id as id',
        'notification.title as title',
        'notification.desc as description',
        // "court_lawyer.courtId as courtId"
        // "l.courts"
        // "ls.days as days",
        // "ls.startTime as startTime",
        // "ls.endTime as endTime"
      ]);

    queryBuilder.orderBy('notification.createdAt', pageOptionsDto.order);

    const res = new ResponseData();

    const itemCount = await queryBuilder.getCount();
    const notification = await queryBuilder.getRawMany();

    console.log(pageOptionsDto.enable);
    if (pageOptionsDto.enable == true) {
      console.log('reched');
      res.statusCode = HttpStatus.OK;
      res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
      res.data = { notification };
      return res;
    }
    console.log('ssd');

    // console.log(pageOptionsDto.skip);
    // console.log(pageOptionsDto.PageSize);
    const notifications = notification.slice(
      pageOptionsDto.skip,
      pageOptionsDto.PageSize * pageOptionsDto.pageNo,
    );

    const paginationDetail = new PageMetaDto({ itemCount, pageOptionsDto });

    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    res.data = { notifications, paginationDetail };
    return res;
  }
}
