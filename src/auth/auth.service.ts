import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  argon,
  ENV,
  generateCode,
  generateLawyerPassword,
  searalizeUser,
  throwForbiddenException,
  throwForbiddenExceptionFoodAllergies,
  throwForbiddenExceptionTimeScheduleId,
  throwForbiddenExceptionUser,
} from 'core/constant';
import { User } from 'core/entities';
import { ROLE, STATUS } from 'core/enums';
import { CoreService } from 'core/service';
import { Brackets } from 'typeorm';
import { SignUpDto } from './dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtPayload, Tokens } from './types';
import { ResponseData } from 'core/common/ResponseModel';
import { RESPOSE_CODE_MESSAGE } from 'core/enums/respose-code-status';
import { LoginUserDetail } from './responseModel/userDetail';
import { UserDetailInfo } from './responseModel/userDetailInfo';
import { AdminDetailInfo } from './responseModel/adminDrtailInfo';
import { AdminDetail } from './responseModel/adminDetail';
import { PageOptionsDto } from 'admin/dto/pageOption.dto';
import { PageMetaDto } from 'admin/dto/pageMeta.dto';
import { EmailDto } from './dto/email.dto';
import { ChangeForgetPasswordDto } from './dto/change-forget-password.dto';
import { OtpVerifyNumberDto } from './dto/otp-verify-number.dto';
import { Student } from 'core/entities/student.entity';
import { CreateStudentDto } from 'feature/student/dto/create-student.dto';
import { UserChangePasswordDto } from './dto/user-change-password';
import { LoginStudentDetail } from './responseModel/studentDetail';
import { LoginStudentTypeDetail } from './responseModel/typeDetail';
import { UpdateBalanceStudent } from 'feature/student/dto/updateBalance-student.dto';

@Injectable()
export class AuthService extends CoreService {
  constructor(private _jwt: JwtService) {
    super();
  }
  async signUpAdmin(data: SignUpDto) {
    this.logger.warn('Sign Up Admin is triggered!');
    const hashResult = await argon.hash(data.password);

    const existUser = await this.repos.user.findOneBy({ email: data.email });
    throwForbiddenException(existUser);

    const user = this.repos.user.create({ ...data, password: hashResult });
    await this.repos.user.save(user);

    const token = await this.returnGeneratedToken(user);
    const res = new ResponseData();

    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.REGISTERSUCCESSFULL];
    res.data = token;
    return res;
  }
  // Note: Extreme Nessary Not Many to many Insert TypeORM
  async signUpLawyer(data: CreateStudentDto): Promise<any> {
    const res = new ResponseData();

    const existUser = await this.repos.user.findOneBy({ email: data.email });
    throwForbiddenException(existUser);
    
    const existTimeSchedules = await this.repos.orderTime.findOneBy({ id: data.timeScheduleId });
    throwForbiddenExceptionTimeScheduleId(existTimeSchedules);
    
    const existFoodAllergies = await this.repos.foodAllergies.findOneBy({ id: data.allergiesId });
    throwForbiddenExceptionFoodAllergies(existFoodAllergies);

    const service = await this.repos.type.findOneBy({ id: data.typeId });
    if (!service) {
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.message = [RESPOSE_CODE_MESSAGE.TYPENOTFOUND];
      return res;
    }

    // const specialization = await this.repos.specialization.findOneBy({ id: data.specializationId });
    // throwForbiddenExceptionSpecialization(specialization);

    const user: User = searalizeUser(data, data.role, STATUS.ACTIVE);

    const password = await generateCode();

    user.password = await argon.hash(password);
    // // user.city = data.city;
    try {
      const createUser = this.repos.user.create(user);
      await this.repos.user.save(createUser);
      const userId = await this.repos.user.save(createUser);

      const student: Student = {
        typeId: data.typeId,
        timeScheduleId: data.timeScheduleId,
        secPhone: data.secPhone,
        balance: data.balance,
        paid_balance: data.paid_balance,
        total_balance: data.total_balance,
        allergiesId: data.allergiesId,
        userId: userId.id,
      };

      const create = this.repos.student.create(student);
      await this.repos.student.save(create);

      await this.mail.signUpPassword({
        to: data.email,
        name: data.name,
        password,
      });
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
  async signUpLocal(data: SignUpDto): Promise<Tokens> {
    const hashResult = await argon.hash(data.password);

    const existUser = await this.repos.user.findOneBy({ email: data.email });

    if (existUser)
      throw new ForbiddenException(
        'User already Exsist with the ' + data.email,
      );

    const user = this.repos.user.create({ ...data, password: hashResult });
    await this.repos.user.save(user);

    return this.returnGeneratedToken(user);
  }
  // async signinLocal(dto: SignInDto): Promise<ResponseData<AdminDetailInfo>> {
  //   const res = new ResponseData<AdminDetailInfo>();

  //   const user = await this.repos.user.findOneBy({ email: dto.email });
  //   throwForbiddenExceptionUser(user);

  //   if (user.role != ROLE.ADMIN) {
  //     res.statusCode = HttpStatus.BAD_REQUEST;
  //     res.message = [RESPOSE_CODE_MESSAGE.ADMINLOGIN];
  //     return res;
  //   }
  //   // if (!user) throw new ForbiddenException('Access Denied');
  //   if (user.status != STATUS.ACTIVE) {
  //     res.statusCode = HttpStatus.BAD_REQUEST;
  //     res.message = [RESPOSE_CODE_MESSAGE.Wait];
  //     return res;
  //   }
  //   // throw new BadRequestException('user unverified')

  //   const passwordMatches = await argon.verify(user.password, dto.password);
  //   if (!passwordMatches) {
  //     res.statusCode = HttpStatus.UNAUTHORIZED
  //     res.message = [RESPOSE_CODE_MESSAGE.INVALID];
  //     return res;
  //   }

  //   const token = await this.returnGeneratedToken(user);

  //   // eslint-disable-next-line prefer-const
  //   let loginUserDetail = new AdminDetail();

  //   loginUserDetail.id = token.user.id,
  //     loginUserDetail.name = token.user.name,
  //     loginUserDetail.email = token.user.email,
  //     loginUserDetail.status = token.user.status,
  //     loginUserDetail.role = token.user.role,
  //     loginUserDetail.phone = token.user.phone;

  //   const resp = new AdminDetailInfo();

  //   resp.accessToken = token.access_token,
  //     resp.refreshToken = token.refresh_token,
  //     resp.userDetails = loginUserDetail

  //   res.statusCode = HttpStatus.OK;
  //   res.message = [RESPOSE_CODE_MESSAGE.SUCCESSFULL];
  //   res.data = resp
  //   return res;
  // }

  async signin(dto: SignInDto) {
    const res = new ResponseData();

    const user = await this.repos.user.findOneBy({ email: dto.email });

    throwForbiddenExceptionUser(user);

    if (user.status != STATUS.ACTIVE) {
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.message = [RESPOSE_CODE_MESSAGE.Wait];
      return res;
    }
    const passwordMatches = await argon.verify(user.password, dto.password);
    if (!passwordMatches) {
      res.statusCode = HttpStatus.UNAUTHORIZED;
      res.message = [RESPOSE_CODE_MESSAGE.INVALID];
      return res;
    }
    const token = await this.returnGeneratedToken(user);
    if (user.role === ROLE.ADMIN) {
      console.log('hello');
      // eslint-disable-next-line prefer-const
      let loginUserDetail = new AdminDetail();
      (loginUserDetail.id = token.user.id),
        (loginUserDetail.name = token.user.name),
        (loginUserDetail.email = token.user.email),
        (loginUserDetail.image = token.user.image),
        (loginUserDetail.status = token.user.status),
        (loginUserDetail.role = token.user.role),
        (loginUserDetail.phone = token.user.phone);

      const resp = new AdminDetailInfo();
      (resp.accessToken = token.access_token),
        (resp.refreshToken = token.refresh_token),
        (resp.userDetails = loginUserDetail);

      res.statusCode = HttpStatus.OK;
      res.message = [RESPOSE_CODE_MESSAGE.SUCCESSFULL];
      res.data = resp;
      return res;
    }
    if (user.role === ROLE.STUDENT || user.role === ROLE.STAFF) {
      console.log('hye');

      const student = await this.repos.student.findOne({
        where: { userId: user.id },
      });

      const loginUserDetail = new LoginUserDetail();
      const loginStudentDetail = new LoginStudentDetail();

      (loginUserDetail.id = token.user.id),
        (loginUserDetail.name = token.user.name),
        (loginUserDetail.email = token.user.email),
        (loginUserDetail.status = token.user.status),
        (loginUserDetail.role = token.user.role),
        (loginUserDetail.phone = token.user.phone),
        (loginUserDetail.image = user.image),
        (loginUserDetail.address = user.address),
        (loginUserDetail.gender = token.user.gender);
      loginStudentDetail.secPhone = student.secPhone;
      loginStudentDetail.allergies = student.allergiesId;
      loginStudentDetail.balance = student.balance;
      loginStudentDetail.type = student.typeId;

      const resp = new UserDetailInfo();
      (resp.accessToken = token.access_token),
        (resp.refreshToken = token.refresh_token),
        (resp.userDetails = loginUserDetail),
        (resp.studentDetail = loginStudentDetail);

      console.log(resp);

      res.statusCode = HttpStatus.OK;
      res.message = [RESPOSE_CODE_MESSAGE.SUCCESSFULL];
      res.data = resp;
      return res;
    }
  }

  // async forgetPassword(email: string) {
  //   const user = await this.repos.user.findOneBy({ email });
  //   if (!user) throw new ForbiddenException('Username is incorrect');
  //   const uuidToken: string = uuid();
  //   await this.repos.user.update(user.id, { forgetPasswordToken: uuidToken })

  //   await this.mail.forgetPassword({ to: user.email, name: user.name, uuidToken });
  //   return { message: "Forget Password Email Sent on " + user.email }
  // }
  async forgetPassword(body: EmailDto) {
    const user = await this.repos.user.findOneBy({ email: body.email });
    throwForbiddenExceptionUser(user);
    const code = await generateLawyerPassword();

    // const otpcode = Math.floor(1000 + Math.random() * 9000);
    await this.repos.user.update(user.id, { forgetPasswordToken: code });
    await this.mail.forgetPassword({
      to: user.email,
      name: user.name,
      uuidToken: code,
    });
    // await this.mail.signUpPassword({ to: data.email, name: data.name, password });

    const res = new ResponseData();

    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.FORGETCODE];
    return res;
  }

  // async forgetPassword(body: ChangeStatusDto) {

  //   const user = await this.repos.user.findOneBy({ email: body.email })
  //   throwForbiddenExceptionUser(user);
  //   const code = await generateCode();

  //   // const otpcode = Math.floor(1000 + Math.random() * 9000);
  //   await this.repos.user.update(user.id, { forgetPasswordToken: code })
  //   await this.mail.forgetPassword({ to: user.email, name: user.name, uuidToken: code });
  //   // await this.mail.signUpPassword({ to: data.email, name: data.name, password });

  //   const res = new ResponseData();

  //   res.statusCode = HttpStatus.OK
  //   res.message = [RESPOSE_CODE_MESSAGE.FORGETCODE];
  //   return res;
  // }

  async otpverificationforget({ email, code }: OtpVerifyNumberDto) {
    const user = await this.repos.user.findOneBy({ email: email });
    throwForbiddenExceptionUser(user);
    try {
      if (code == user.forgetPasswordToken) {
        user.forgetPasswordToken = null;
        await this.repos.user.update(user.id, { forgetPasswordToken: null });
        const { id } = user;
        const result = { id };
        const data = result;
        const res = new ResponseData();
        res.statusCode = HttpStatus.OK;
        res.message = [RESPOSE_CODE_MESSAGE.OTPVERIFIED];
        res.data = data;
        return res;
      } else {
        const res = new ResponseData();
        res.statusCode = HttpStatus.BAD_REQUEST;
        res.message = [RESPOSE_CODE_MESSAGE.CODENOTMATCH];
        return res;
      }
    } catch (e) {}
  }

  async forgetPasswordUpdate(body: ChangeForgetPasswordDto) {
    const res = new ResponseData();
    const user = await this.repos.user.findOneBy({ id: body.id });
    throwForbiddenExceptionUser(user);
    const passwordMatches = await argon.verify(user.password, body.password);
    if (passwordMatches) {
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.message = [RESPOSE_CODE_MESSAGE.SAMEPASSWORD];
      return res;
    }

    await this.repos.user.update(user.id, {
      password: await argon.hash(body.password),
    });
    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.UPDATEDPASSWORD];
    return res;
  }

  async changePassword({ id, password }) {
    const res = new ResponseData();

    const user = await this.repos.user.findOneBy({ id: id });
    throwForbiddenExceptionUser(user);
    await this.repos.user.update(id, {
      password: await argon.hash(password),
      forgetPasswordToken: null,
    });
    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.UPDATEDPASSWORD];
    return res;
  }

  async userChangePassword(dto: UserChangePasswordDto) {
    const res = new ResponseData();

    const user = await this.repos.user.findOneBy({ id: dto.id });
    throwForbiddenExceptionUser(user);

    const passwordMatches = await argon.verify(user.password, dto.oldPassword);
    if (!passwordMatches) {
      res.statusCode = HttpStatus.NOT_FOUND;
      res.message = [RESPOSE_CODE_MESSAGE.INVALIDPASSWORD];
      return res;
    }

    await this.repos.user.update(dto.id, {
      password: await argon.hash(dto.password),
    });
    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.UPDATEDPASSWORD];
    return res;
  }

  async logout(id: number): Promise<boolean> {
    if (!id) return false;
    const result = await this.repos.user.findOneBy({ id });
    if (result && result.hashedRt != null) {
      this.repos.user.update(id, { hashedRt: null });
    }
    return true;
  }
  async refreshTokens(id: number, rt: string): Promise<Tokens> {
    const user = await this.repos.user.findOneBy({ id });

    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    return this.returnGeneratedToken(user);
  }
  async returnGeneratedToken(user: User) {
    const tokens = await this.getTokens(user as any);
    await this.updateRtHash(user.id, tokens.refresh_token);
    tokens.user = this.returnedSearializedUser(user);
    return tokens;
  }
  async getTokens({ id, email, role, name }): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: id,
      email,
      role,
      name,
    };

    const [at, rt] = await Promise.all([
      this._jwt.signAsync(jwtPayload, {
        secret: ENV.JWT_AT_SECRET,
        expiresIn: ENV.JWT_ACCESS_TOKEN_EXPIRE,
      }),
      this._jwt.signAsync(jwtPayload, {
        // secret: this._config.get<string>(ENV.JWT_RT_SECRET),
        secret: ENV.JWT_RT_SECRET,
        expiresIn: ENV.JWT_REFRESH_TOKEN_EXPIRE,
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
  async updateRtHash(id: number, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.repos.user.update(id, { hashedRt: hash });
  }
  returnedSearializedUser({
    id,
    name,
    email,
    gender,
    phone,
    role,
    image,
    status,
  }: User) {
    return { id, name, email, gender, phone, role, status, image };
  }
  async getLawyerByName({ name, email }) {
    return this.repos.user.find({
      where: { name, email, role: ROLE.STUDENT },
      select: { name: true, email: true, id: true },
    });
  }
  // async invitelawyer({ name, to, from }) {
  //   try {
  //     await this.mail.sendRequestForTeam({
  //       to,
  //       name,
  //       from
  //     })
  //   } catch (error) {

  //   }

  // }

  // async getLawyerDetail(id: number): Promise<ResponseData<LoginUserDetail>> {
  //   const res = new ResponseData<LoginUserDetail>();

  //   const user = await this.repos.user.findOneBy({ id });
  //   throwForbiddenExceptionUser(user);

  //   const token = await this.returnGeneratedToken(user);

  //   const findUser = await this.repos.user.findOne({
  //     where: {
  //       id: user.id,
  //     },
  //   })

  //   // eslint-disable-next-line prefer-const
  //   let loginUserDetail = new LoginUserDetail();

  //   loginUserDetail.id = token.user.id,
  //     loginUserDetail.name = token.user.name,
  //     loginUserDetail.image = user.image,
  //     loginUserDetail.address = user.address,
  //     loginUserDetail.gender = token.user.gender,
  //     loginUserDetail.city = user.city,
  //     loginUserDetail.caseCategory = findUser.caseSpecialization,

  //     // loginUserDetail.specialization = findUser.specialization.title
  //     loginUserDetail.court = [];

  //   // loginUserDetail.days = [];
  //   // loginUserDetail.startTime = [];

  //   // loginUserDetail.endTime = [];
  //   loginUserDetail.schedule = finddays;

  //   for (let i = 0; i <= findUser.courts.length - 1; i++) {
  //     loginUserDetail.court.push(findUser.courts[i].title);
  //     continue;
  //   }

  //   // for (let i = 0; i <= finddays.length - 1; i++) {
  //   //   loginUserDetail.days.push(finddays[i].days);
  //   //   loginUserDetail.startTime.push(finddays[i].startTime);
  //   //   loginUserDetail.endTime.push(finddays[i].endTime);
  //   //   // loginUserDetail.schedule.push(finddays[i]);

  //   //   continue;
  //   // }

  //   // const resp = new UserDetailInfo();

  //   // resp.accessToken = token.access_token,
  //   //   resp.refreshToken = token.refresh_token,
  //   const userDetails = loginUserDetail

  //   res.statusCode = HttpStatus.OK;
  //   res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
  //   res.data = userDetails
  //   return res;
  // }

  public async getLawyerList(pageOptionsDto: PageOptionsDto) {
    const queryBuilder = this.repos.user
      .createQueryBuilder('user')
      .innerJoin(Student, 'student', 'student.userId = user.id')
      .select([
        'user.id as id',
        'user.externalId as externalId',
        'user.name as name',
        'user.email  as email ',
        'user.image as image ',
        'user.status as status',
        'user.role as role',
        'user.phone as phone',
        'user.gender as gender',
        'user.address as address',
        'user.image as image',
        'student.type as type',
        'student.secPhone as secPhone',
        'student.allergies as allergies',
        'student.balance as balance',
        'student.paid_balance as paid_balance',
        'student.total_balance as total_balance',
      ])
      .where(
        'user.role IN (:...roles) AND (user.name LIKE :name AND user.status = :status)',
        {
          roles: [ROLE.STUDENT, ROLE.STAFF],
          name: `%${pageOptionsDto.search}%`,
          status: pageOptionsDto.status || null,
        },
      );

    queryBuilder.orderBy('user.createdAt', pageOptionsDto.order);

    const res = new ResponseData();

    const itemCount = await queryBuilder.getCount();
    const entities = await queryBuilder.getRawMany();

    console.log(pageOptionsDto.enable);
    if (pageOptionsDto.enable == true) {
      console.log('reched');

      res.statusCode = HttpStatus.OK;
      res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
      res.data = { entities };
      return res;
    }

    // console.log(pageOptionsDto.skip);
    // console.log(pageO
    // ptionsDto.PageSize;
    const student = entities.slice(
      pageOptionsDto.skip,
      pageOptionsDto.PageSize * pageOptionsDto.pageNo,
    );

    const paginationDetail = new PageMetaDto({ itemCount, pageOptionsDto });

    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    res.data = { student, paginationDetail };
    return res;
  }
  public async getAdminList(pageOptionsDto: PageOptionsDto) {
    // const queryBuilder = this.repos.user.createQueryBuilder("user")
    //   .select([
    //     "user.id as id",
    //     "user.name as name",
    //     "user.email  as email ",
    //     "user.status as status",
    //     "user.role as role",
    //     "user.phone as phone",
    //     "user.gender as gender",
    //     "user.address as address",
    //     "user.image as image",
    //   ])
    //   .where("user.role IN (:...roles) AND (user.name LIKE :name AND user.status = :status)", {
    //     roles: [ROLE.ADMIN],
    //     name: `%${pageOptionsDto.search}%`,
    //     status: pageOptionsDto.status || null,
    //   })

    // // queryBuilder
    //   .orderBy("user.createdAt", pageOptionsDto.order);

    const queryBuilder = await this.repos.user
      .createQueryBuilder('user')
      .where('user.role = :role', { role: ROLE.ADMIN })
      .andWhere(
        new Brackets((qb) => {
          qb.where('user.phone LIKE :phone', {
            phone: `%${pageOptionsDto.search}%`,
          })
            .orWhere('user.email LIKE :email', {
              email: `%${pageOptionsDto.search}%`,
            })
            .orWhere('user.name LIKE :name', {
              name: `%${pageOptionsDto.search}%`,
            });
        }),
      )
      .select([
        'user.id as id',
        'user.externalId as externalId',
        'user.name as name',
        'user.email as email',
        'user.image as image',
        'user.status as status',
        'user.role as role',
        'user.phone as phone',
        'user.gender as gender',
        'user.address as address',
        'user.image as image',
      ])
      .orderBy('user.createdAt', pageOptionsDto.order);

    const res = new ResponseData();

    const itemCount = await queryBuilder.getCount();
    const entities = await queryBuilder.getRawMany();
    // console.log("itemCount");
    // console.log(itemCount);
    // console.log("entities");
    // console.log(entities);

    if (pageOptionsDto.enable == true) {
      console.log('reched');
      res.statusCode = HttpStatus.OK;
      res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
      res.data = { entities };
      return res;
    }
    const admin = entities.slice(
      pageOptionsDto.skip,
      pageOptionsDto.PageSize * pageOptionsDto.pageNo,
    );

    const paginationDetail = new PageMetaDto({ itemCount, pageOptionsDto });

    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    res.data = { admin, paginationDetail };
    return res;
  }

  // public async getLawyersearch(search:string) {
  //   const queryBuilder = await this.repos.user.createQueryBuilder("user")
  //     // .innerJoin(Lawyer, 'l', 'l.id = user.id')
  //     // .from('court_lawyer','court_lawyer.lawyerId  = user.id')s
  //     // .innerJoin(LawyerSchedule,'ls', 'ls.lawyerId = user.id').
  //     .where("user.role =:role AND ((l.caseSpecialization LIKE :caseSpecialization OR user.name LIKE :name OR  user.city LIKE :city) AND user.status =:status)", { role: ROLE.LAWYER, caseSpecialization: `%${search}%`, name: `%${search}%`, city: `%${search}%`, status:"Active" })
  //     .select([
  //       "user.id as id",
  //       "user.name as name",
  //       "user.gender as gender",
  //       "user.city as city",
  //       "user.image as image",
  //       `l.caseSpecialization as caseSpecialization`,
  //       // "court_lawyer.courtId as courtId"
  //       // "l.courts"
  //       // "ls.days as days",
  //       // "ls.startTime as startTime",
  //       // "ls.endTime as endTime"
  //     ]);

  //   queryBuilder
  //     .orderBy("user.name")

  //   const itemCount = await queryBuilder.getCount();
  //   const entities = await queryBuilder.getRawMany();
  //   // console.log(pageOptionsDto.skip);
  //   // console.log(pageOptionsDto.PageSize);
  //   // const lawyer = entities.slice(pageOptionsDto.skip, pageOptionsDto.PageSize * pageOptionsDto.pageNo);

  //   // const paginationDetail = new PageMetaDto({ itemCount, pageOptionsDto });

  //   const res = new ResponseData();

  //   res.statusCode = HttpStatus.OK;
  //   res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
  //   res.data = { entities }
  //   return res;
  // }

  async profile(id: number): Promise<ResponseData<UserDetailInfo>> {
    const res = new ResponseData<UserDetailInfo>();

    const user = await this.repos.user.findOneBy({ id: id });
    const student = await this.repos.student.findOneBy({ userId: id });
    const studentType = await this.repos.type.findOneBy({ id: student.typeId });
    throwForbiddenExceptionUser(user);

    const token = await this.returnGeneratedToken(user);

    // const findUser = await this.repos.lawyer.findOne({
    //   where: {
    //     id: user.id,
    //   },
    //   relations: {
    //     courts: true,
    //   },
    // })

    // const lawyerSchedule: any[] = [];

    // const findUserSude = await this.repos.lawyerSchedule.find({
    //   where: {
    //     lawyerId: id,
    //   },
    //   select: {
    //     startTime: true,
    //     endTime: true,
    //     days: true
    //   }
    // })
    // // console.log('sssss', findUserSude)
    // for (let i = 0; i <= findUserSude.length - 1; i++) {
    //   lawyerSchedule.push(findUserSude[i]);
    //   continue;
    // }
    // console.log('sddddss', lawyerSchedule)

    // eslint-disable-next-line prefer-const
    let loginUserDetail = new LoginUserDetail();
    const loginStudentDetail = new LoginStudentDetail();
    const loginStudentTypeDetail = new LoginStudentTypeDetail();

    (loginUserDetail.id = token.user.id),
      (loginUserDetail.name = token.user.name),
      (loginUserDetail.email = token.user.email),
      (loginUserDetail.status = token.user.status),
      (loginUserDetail.role = token.user.role),
      (loginUserDetail.phone = token.user.phone),
      (loginUserDetail.image = user.image),
      (loginUserDetail.address = user.address),
      (loginUserDetail.gender = token.user.gender);
    loginStudentDetail.allergies = student.allergies;
    loginStudentDetail.secPhone = student.secPhone;
    loginStudentDetail.type = student.type;
    loginStudentTypeDetail.name = studentType.name;
    // loginUserDetail.city = user.city

    const resp = new UserDetailInfo();
    (resp.userDetails = loginUserDetail),
      loginStudentDetail,
      loginStudentTypeDetail;
    resp.studentDetail = loginStudentDetail;
    // resp.typeDetail = loginStudentTypeDetail;
    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    res.data = resp;
    return res;
  }

  async updateBalance(id: number, body: UpdateBalanceStudent) {
    console.log(body.balance);
    // process.exit(0)
    let previousBalance = 0;
    const response = new ResponseData();
    const userId = await this.repos.user.findOneBy({ id: id });
    const studentData = await this.repos.student.findOneBy({
      userId: id,
    });
    previousBalance += studentData.balance;
    if (!userId) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.message = [RESPOSE_CODE_MESSAGE.NOTFOUND];
    } else if (!studentData) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.message = [RESPOSE_CODE_MESSAGE.NOTFOUND];
    } else {
      try {
        await this.repos.student.update(
          { userId: id },
          { balance: +previousBalance + body.balance },
        );
        response.statusCode = HttpStatus.OK;
        response.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
      } catch (e) {}
    }
    return response;
  }
  async updateBalanceMinus(id: number, body: UpdateBalanceStudent) {
    let previousBalance = 0;
    const response = new ResponseData();
    const userId = await this.repos.user.findOneBy({ id: id });
    const studentData = await this.repos.student.findOneBy({
      userId: id,
    });
    await this.mail.updateBalanceMinus({
      to: userId.email,
      name: userId.name,
      amount:body.balance,
    });
    previousBalance += studentData.balance;
    if (!userId) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.message = [RESPOSE_CODE_MESSAGE.NOTFOUND];
    } else if (!studentData) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.message = [RESPOSE_CODE_MESSAGE.NOTFOUND];
    } else {
      try {
        await this.repos.student.update(
          { userId: id },
          { balance: +previousBalance - body.balance },
        );
        await this.mail.updateBalanceMinus({
          to: userId.email,
          name: userId.name,
          amount: body.balance,
        });
        response.statusCode = HttpStatus.OK;
        response.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
      } catch (e) {}
    }
    return response;
  }
  async getStudentData({ id }) {
    // console.log({id});
    // process.exit(0)
    const user = await this.repos.user.findOneBy({ id: id });
    let userData;
    const response = new ResponseData();
    if (user.role == ROLE.ADMIN) {
      userData = await this.repos.user
        .createQueryBuilder('user')
        .select(['user.name as name', 'user.image as image'])
        .where(`user.id = ${id}`)
        .getRawMany();
    } else if (user.role == ROLE.STAFF || ROLE.STUDENT) {
      userData = await this.repos.user
        .createQueryBuilder('user')
        .innerJoin(Student, 'student', `student.userId = ${id}`)
        .select([
          'user.name as name',
          'user.image as image',
          'student.balance as balance',
          'student.paid_balance as paid_balance',
          'student.allergiesId as allergy',
        ])
        .where(`user.id = ${id}`)
        .getRawMany();
    }
    // const student = await this.repos.student.findOneBy({ userId: id });
    if (!user) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.message = [RESPOSE_CODE_MESSAGE.NOTFOUND];
    } else {
      response.statusCode = HttpStatus.OK;
      response.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
      response.data = userData;
    }
    return response;
  }
}
