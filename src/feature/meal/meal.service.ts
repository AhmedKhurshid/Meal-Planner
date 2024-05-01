import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { CoreService } from 'core/service';
import { Order } from 'core/entities/order.entity';
import { ResponseData } from 'core/common/ResponseModel';
import { RESPOSE_CODE_MESSAGE, ROLE, STATUS } from 'core/enums';
// import { throwForbiddenException } from 'core/constant';
import { addHours } from 'date-fns';
import { MealPlan } from 'core/entities/mealPlan.entity';
import { Item } from 'core/entities/item.entity';
import { User } from 'core/entities';
// import { PageOptionsDto } from 'admin/dto/pageOption.dto';
import { PageMetaDto } from 'admin/dto/pageMeta.dto';
// import { time } from 'console';
import { PageOptionsDtoOrder } from './dto/pageOptionOrder.dto';
// import { StudentTpye } from 'core/entities/studentType.entity';
import { Student } from 'core/entities/student.entity';
import { Brackets } from 'typeorm';
import { date } from 'joi';

@Injectable()
export class MealService extends CoreService {
  async create(createMealDto: CreateMealDto) {
    const res = new ResponseData();
    const items = createMealDto.mealPlanId;
    // const qty = createMealDto.quantity;
    

    const studentOrderTime = await this.repos.student.findOneBy({
      userId: createMealDto.userId,
    });
    const orderTimeId = await this.repos.orderTime.findOneBy({
      id: studentOrderTime.timeScheduleId,
    });
    
    
    

    const timeString = createMealDto.time.toString(); // Convert to string
    const dateTimeParts = timeString.split(' '); // Split date and time
    const timePart = dateTimeParts[1];
    const datePart = dateTimeParts[0];

    if (
      timePart < orderTimeId.orderTimeIn ||
      timePart > orderTimeId.orderTimeOut
    ) {
      res.statusCode = HttpStatus.FORBIDDEN;
      res.message = [RESPOSE_CODE_MESSAGE.ORDERPLACETIME];
      return res;
    }

    const mealPlan1 = await this.repos.mealPlan.findOneBy({ id: items[0] });
    const mealPlan2 = await this.repos.mealPlan.findOneBy({ id: items[1] });

    if (!mealPlan1 || !mealPlan2) {
      res.statusCode = HttpStatus.NOT_FOUND;
      res.message = [RESPOSE_CODE_MESSAGE.MEALPLANNOTFOUND];
      return res;
    }

    if (
      (items.length == 2 && createMealDto.quantity > 1) ||
      createMealDto.quantity > 2
    ) {
      res.statusCode = HttpStatus.FORBIDDEN;
      res.message = [RESPOSE_CODE_MESSAGE.MAXTWOQUANTITYCANORDER];
      return res;
    }
    const userLastorder = await this.repos.order.findOne({
      where: { userId: createMealDto.userId },
      order: { createdAt: 'DESC' }, // Fetch the latest order based on createdAt
    });

    if (userLastorder !== null) {
  
      // const date = new Date(userLastorder.time);
      const extractedDate = userLastorder.time.split(' ')[0];
      if (datePart == extractedDate) {
        res.statusCode = HttpStatus.FORBIDDEN;
        res.message = [RESPOSE_CODE_MESSAGE.TODAYMEALALREADYORDERED];
        return res;
      }

    }

    for (let index = 0; index < items.length; index++) {
      const itemId = items[index];

      // const meal = await this.repos.order.findOneBy({ mealPlanId: itemId });
      const meal = await this.repos.order.findOneBy({
        mealPlanId: itemId,
        userId: createMealDto.userId,
      });

      
      

      if (meal) {
        res.statusCode = HttpStatus.FORBIDDEN;
        res.message = [RESPOSE_CODE_MESSAGE.ALREADYORDERED];
        return res;
      }

      

      const mealOrder: Order = {
        status: STATUS.ACTIVE,
        userId: createMealDto.userId,
        mealPlanId: itemId,
        quantity: createMealDto.quantity,
        // time: createMealDto.time || new Date(), // Set to current time if not provided
        time: createMealDto.time, // Set to current time if not provided
      };

      const mealPlan = await this.repos.mealPlan.findOneBy({ id: itemId });
      const itemBalance = await this.repos.item.findOneBy({
        id: mealPlan.itemId,
      });

      const studentBalance = await this.repos.student.findOneBy({
        userId: createMealDto.userId,
      });

      if (createMealDto.quantity == 2) {
        const studentBalanceBalance =
          studentBalance.balance +
          (itemBalance.markupPrice + itemBalance.costPrice) *
            createMealDto.quantity;
        
        await this.repos.student.update(studentBalance, {
          balance: studentBalanceBalance,
        });

        const create = this.repos.order.create(mealOrder);
        await this.repos.order.save(create);

        res.statusCode = HttpStatus.OK;
        res.message = [RESPOSE_CODE_MESSAGE.ORDERED];
        return res;
      }

      const studentBalanceBalance =
        studentBalance.balance +
        (itemBalance.markupPrice + itemBalance.costPrice);

      await this.repos.student.update(studentBalance, {
        balance: studentBalanceBalance,
      });

      const create = this.repos.order.create(mealOrder);
      await this.repos.order.save(create);
    }

    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ORDERED];
    return res;
  }

  async findAllUserMeal({ id }, pageOptionsDto) {
    const res = new ResponseData();

    const user = await this.repos.user.findOneBy({ id });

    if (!user) {
      res.statusCode = HttpStatus.NOT_FOUND;
      res.message = [RESPOSE_CODE_MESSAGE.USERNOTFOUND];
      return res;
    }

    // if (pageOptionsDto.enable === true) {
    //   const date = new Date();
    //   const dateSplit = date.toISOString().split('T')[0];

    //   const queryBuilder = this.repos.order.createQueryBuilder("order")
    //     .innerJoin(MealPlan, 'm', 'm.id = order.mealPlanId')
    //     .innerJoin(Item, 's', 's.id = m.itemId')
    //     .innerJoin(User, 'u', 'u.id = :userId', { userId: user?.id }) // Ensure user.id is not undefined
    //     .select([
    //       "order.status as status",
    //       // "order.time as date",
    //       "DATE_FORMAT(order.time, '%Y-%m-%d') as date",
    //       "order.id as id",
    //       // "order.userId as UserIDD",
    //       "m.status as mealStatus",
    //       // "m.meal_date as mealDate",
    //       "DATE_FORMAT(m.meal_date, '%Y-%m-%d') as mealDate",
    //       "s.name as itemName",
    //       "s.type as itemType",
    //       "u.id as userId",
    //       // "u.name as userName",
    //       // "u.email as userEmail",
    //     ])
    //     .where("u.role IN (:...roles) AND order.userId = :userId", {
    //       roles: [ROLE.STUDENT, ROLE.STAFF],
    //       userId: user?.id, // Pass user.id as a parameter
    //     });
    //   const entities = await queryBuilder.getRawMany();

    //   const todayData = [];
    //   for (let index = 0; index < entities.length; index++) {
    //     const element = entities[index];
    //     console.log(element);
    //     console.log(element);
    //     process.exit(0)

    //     const time = element.date.toISOString().split('T')[0];
    //     console.log(time);
    //     process.exit(0)

    //     // if (element.date == dateSplit) {
    //     if (time == dateSplit) {
    //       todayData.push(element);
    //     }
    //   }
    //   queryBuilder
    //     .orderBy("order.createdAt", pageOptionsDto.order)

    //   res.statusCode = HttpStatus.OK;
    //   res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    //   res.data = todayData
    //   return res;

    // }

    const queryBuilder = this.repos.order
      .createQueryBuilder('order')
      .innerJoin(MealPlan, 'm', 'm.id = order.mealPlanId')
      .innerJoin(Item, 's', 's.id = m.itemId')
      .innerJoin(User, 'u', 'u.id = :userId', { userId: user?.id }) // Ensure user.id is not undefined
      .select([
        'order.status as status',
        // "order.time as date",
        "DATE_FORMAT(order.time, '%Y-%m-%d') as date",
        'order.id as id',
        'order.quantity as orderedQuantity',
        // "order.userId as UserIDD",
        'm.status as mealStatus',
        // "m.meal_date as mealDate",
        "DATE_FORMAT(m.meal_date, '%Y-%m-%d') as mealDate",
        's.name as itemName',
        's.type as itemType',
        's.image as image',
        'u.id as userId',
        // "u.name as userName",
        // "u.email as userEmail",
      ])
      .where('u.role IN (:...roles) AND order.userId = :userId', {
        roles: [ROLE.STUDENT, ROLE.STAFF],
        userId: user?.id, // Pass user.id as a parameter
      });

    if (pageOptionsDto.startDate && pageOptionsDto.endDate) {
      const entities = await queryBuilder.getRawMany();
      
      const datedata = [];

      for (let index = 0; index < entities.length; index++) {
        const element = entities[index];

        // const timesSplit = element.date.toISOString().split('T')[0];

        const startDate = pageOptionsDto.startDate;
        const endDate = pageOptionsDto.endDate;

        if (startDate <= element.date && endDate >= element.date) {
          // if (startDate <= timesSplit && endDate >= timesSplit) {
          datedata.push(element);
        }
      }
      const meal = datedata.slice(
        pageOptionsDto.skip,
        pageOptionsDto.PageSize * pageOptionsDto.pageNo,
      );

      const paginationDetail = new PageMetaDto({
        itemCount: datedata.length,
        pageOptionsDto,
      });

      res.statusCode = HttpStatus.OK;
      res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
      res.data = { meal, paginationDetail };
      return res;
    }

    queryBuilder.orderBy('order.createdAt', pageOptionsDto.order);

    const itemCount = await queryBuilder.getCount();
    const entities = await queryBuilder.getRawMany();

    const meal = entities.slice(
      pageOptionsDto.skip,
      pageOptionsDto.PageSize * pageOptionsDto.pageNo,
    );

    const paginationDetail = new PageMetaDto({ itemCount, pageOptionsDto });

    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    res.data = { meal, paginationDetail };
    return res;
  }

  async findAll(pageOptionsDto: PageOptionsDtoOrder) {
    const res = new ResponseData();

    if (pageOptionsDto.enable === true) {
      const date = new Date();
      const dateSplit = date.toISOString().split('T')[0];

      const queryBuilder = this.repos.order
        .createQueryBuilder('order')
        .innerJoin(MealPlan, 'm', 'm.id = order.mealPlanId')
        .innerJoin(Item, 's', 's.id = m.itemId')
        .innerJoin(User, 'u', 'u.id = order.userId')
        .innerJoin(Student, 'student', 'student.userId = u.id')
        // .where(`u.role = :role`, {
        .where(
          '(u.role = :role AND (s.name LIKE :name OR u.gender = :gender) OR order.status = :status)',
          {
            role: ROLE.STUDENT || ROLE.STAFF,
            name: `%${pageOptionsDto.search}%`,
            gender: `${pageOptionsDto.search}`, // assuming gender is a property in your DTO
            status: pageOptionsDto.status,
          },
        )
        .andWhere(
          new Brackets((x) => {
            x.where('student.typeId LIKE :studentTypeId', {
              studentTypeId: `%${pageOptionsDto.studentTypeId}%`,
            });
          }),
        )
        .select([
          'order.status as status',
          'order.time as date',
          'order.quantity as orderedQuantity',
          'm.status as mealStatus',
          // "m.date as mealPlanDate",
          "DATE_FORMAT(m.meal_date, '%Y-%m-%d') as mealDate", // Format the date here
          's.name as itemName',
          's.type as itemType',
          's.costPrice as costPrice',
          's.markupPrice as markupPrice',
          's.image as image',
          'u.id as userId',
          'u.name as userName',
          'u.email as userEmail',
          'u.gender as gender',
          'student.typeId as studentTypeId',
        ]);
      const entities = await queryBuilder.getRawMany();

      const todayData = [];
      for (let index = 0; index < entities.length; index++) {
        const element = entities[index];

        // const time = element.date.toISOString().split('T')[0];
        const time = element.date.split(' ')[0];

        if (time == dateSplit) {
          todayData.push(element);
        }
      }

      queryBuilder.orderBy('order.createdAt', pageOptionsDto.order);

      const itemCount = await queryBuilder.getCount();
      // const entities = await queryBuilder.getRawMany();

      const meal = todayData.slice(
        pageOptionsDto.skip,
        pageOptionsDto.PageSize * pageOptionsDto.pageNo,
      );

      const paginationDetail = new PageMetaDto({
        itemCount: todayData.length,
        pageOptionsDto,
      });

      res.statusCode = HttpStatus.OK;
      res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
      res.data = { meal, paginationDetail };
      return res;
    }

    const queryBuilder = this.repos.order
      .createQueryBuilder('order')
      .innerJoin(MealPlan, 'm', 'm.id = order.mealPlanId')
      .innerJoin(Item, 's', 's.id = m.itemId')
      .innerJoin(User, 'u', 'u.id = order.userId')
      .innerJoin(Student, 'student', 'student.userId = u.id')

      .orWhere(
        '(u.role = :role AND (s.name LIKE :name OR u.gender = :gender) OR order.status = :status)',
        {
          role: ROLE.STUDENT || ROLE.STAFF,
          name: `%${pageOptionsDto.search}%`,
          gender: `${pageOptionsDto.search}`, // assuming gender is a property in your DTO
          status: pageOptionsDto.status,
        },
      )
      
      .select([
        'order.status as status',
        'order.time as date',
        'order.quantity as orderedQuantity',
        'm.status as mealStatus',
        // "m.date as mealPlanDate",
        "DATE_FORMAT(m.meal_date, '%Y-%m-%d') as mealDate", // Format the date here
        's.name as itemName',
        's.type as itemType',
        's.image as image',
        's.costPrice as costPrice',
        's.markupPrice as markupPrice',
        'u.id as userId',
        'u.name as userName',
        'u.email as userEmail',
        'u.gender as gender',
        'student.typeId as studentTypeId',

      ]);

    if (pageOptionsDto.startDate && pageOptionsDto.endDate) {
      const entities = await queryBuilder.getRawMany();

      const datedata = [];

      for (let index = 0; index < entities.length; index++) {
        const element = entities[index];

        // const timesSplit = element.date.toISOString().split('T')[0];
        const timesSplit = element.date.split(' ')[0];

        const startDate = pageOptionsDto.startDate;
        const endDate = pageOptionsDto.endDate;

        if (startDate <= timesSplit && endDate >= timesSplit) {
          datedata.push(element);
        }
      }
      const meal = datedata.slice(
        pageOptionsDto.skip,
        pageOptionsDto.PageSize * pageOptionsDto.pageNo,
      );

      const paginationDetail = new PageMetaDto({
        itemCount: datedata.length,
        pageOptionsDto,
      });

      res.statusCode = HttpStatus.OK;
      res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
      res.data = { meal, paginationDetail };
      return res;
    }
  
    if (pageOptionsDto.studentTypeId) {
      const queryBuilder = this.repos.order
      .createQueryBuilder('order')
      .innerJoin(MealPlan, 'm', 'm.id = order.mealPlanId')
      .innerJoin(Item, 's', 's.id = m.itemId')
      .innerJoin(User, 'u', 'u.id = order.userId')
      .innerJoin(Student, 'student', 'student.userId = u.id')

      .where(
        '(u.role = :role AND (s.name LIKE :name OR u.gender = :gender) OR order.status = :status)',
        {
          role: ROLE.STUDENT || ROLE.STAFF,
          name: `%${pageOptionsDto.search}%`,
          gender: `${pageOptionsDto.search}`, // assuming gender is a property in your DTO
          status: pageOptionsDto.status,
        },
      )
      .andWhere(
        new Brackets((x) => {
          x.where('student.typeId LIKE :studentTypeId', {
            studentTypeId: `%${pageOptionsDto.studentTypeId}%`,
          });
        }),
      )
      .select([
        'order.status as status',
        'order.time as date',
        'order.quantity as orderedQuantity',
        'm.status as mealStatus',
        // "m.date as mealPlanDate",
        "DATE_FORMAT(m.meal_date, '%Y-%m-%d') as mealDate", // Format the date here
        's.name as itemName',
        's.type as itemType',
        's.image as image',
        's.costPrice as costPrice',
        's.markupPrice as markupPrice',
        'u.id as userId',
        'u.name as userName',
        'u.email as userEmail',
        'u.gender as gender',
        'student.typeId as studentTypeId',

      ]);

      const entities = await queryBuilder.getRawMany();

      const datedata = [];

      for (let index = 0; index < entities.length; index++) {
        const element = entities[index];

        datedata.push(element);
      }
      const meal = datedata.slice(
        pageOptionsDto.skip,
        pageOptionsDto.PageSize * pageOptionsDto.pageNo,
      );

      const paginationDetail = new PageMetaDto({
        itemCount: datedata.length,
        pageOptionsDto,
      });

      res.statusCode = HttpStatus.OK;
      res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
      res.data = { meal, paginationDetail };
      return res;
    }

    queryBuilder.orderBy('order.createdAt', pageOptionsDto.order);

    const itemCount = await queryBuilder.getCount();
    const entities = await queryBuilder.getRawMany();

    const meal = entities.slice(
      pageOptionsDto.skip,
      pageOptionsDto.PageSize * pageOptionsDto.pageNo,
    );

    const paginationDetail = new PageMetaDto({ itemCount, pageOptionsDto });

    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    res.data = { meal, paginationDetail };
    return res;
  }
  // async findOne(id: number) {
  //   const res = new ResponseData();
  //   const meal = await this.repos.order.findOneBy({ id })

  //   const queryBuilder = this.repos.order.createQueryBuilder("order")
  //   .leftJoin(MealPlan, 'm', 'm.id = order.mealPlanId')
  //   .innerJoin(Item, 's', 's.id = m.item_id')
  //   .innerJoin(User, 'u', 'u.id = order.userId')
  //   .select([
  //     "u.id as id",
  //     "u.name as name",
  //     "u.email  as email ",
  //     "s.name as name",
  //     "s.type as type",
  //     "m.status as status",
  //     "m.date as date",
  //     "s.type as type",
  //     "s.secPhone as secPhone",
  //     "s.allergies as allergies",
  //   ])
  //   // .where("user.role IN (:...roles)", {
  //   // .where("user.role IN (:...roles) AND user.status IN (:...status) ", {
  //   .where("order.role IN (:...roles) AND (s.name LIKE :name AND order.status = :status)", {
  //     roles: [ROLE.STUDENT, ROLE.STAFF],
  //     name: `%${pageOptionsDto.search}%`,
  //     // status: [STATUS.ACTIVE, STATUS.PENDING],
  //   });

  //   if (!meal) {
  //     res.statusCode = HttpStatus.NOT_FOUND
  //     res.message = [RESPOSE_CODE_MESSAGE.NEWSNOTFOUND]
  //     return res;
  //   }
  //   res.statusCode = HttpStatus.OK
  //   res.message = [RESPOSE_CODE_MESSAGE.ACCEPT]
  //   res.data = meal
  //   return res
  // }

  async updateByAdmin(id: number, updateMeal: UpdateMealDto) {
    const response = new ResponseData();
    const meal = await this.repos.order.findOneBy({ id: id });


    if (!meal) {
      response.statusCode = HttpStatus.NOT_FOUND;
      response.message = [RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
      return response;
    }

    const currentTime = new Date();
    const currentTimeTimestamp = currentTime.getTime();
    const mealTime = addHours(meal.time, 2).getTime();

    if (currentTimeTimestamp > mealTime) {
      response.statusCode = HttpStatus.FORBIDDEN;
      response.message = [RESPOSE_CODE_MESSAGE.ORDEREDTIMEOVER];
      return response;
    }
    await this.repos.order.update(id, { status: updateMeal.status });

    response.statusCode = HttpStatus.OK;
    response.message = [RESPOSE_CODE_MESSAGE.UPDATE];
    return response;
  }

  async updateByUser(idd: number, updateMeal: UpdateMealDto) {
    const response = new ResponseData();
    const meal = await this.repos.order.findOneBy({
      id: idd,
      userId: updateMeal.userId,
    });

    if (!meal) {
      response.statusCode = HttpStatus.NOT_FOUND;
      response.message = [RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
      return response;
    }

    const currentTime = new Date();
    const currentTimeTimestamp = currentTime.getTime();
    const mealTime = addHours(meal.time, 2).getTime();

    if (currentTimeTimestamp > mealTime) {
      response.statusCode = HttpStatus.FORBIDDEN;
      response.message = [RESPOSE_CODE_MESSAGE.ORDEREDTIMEOVER];
      return response;
    }
    await this.repos.order.update(idd, { status: updateMeal.status });

    response.statusCode = HttpStatus.OK;
    response.message = [RESPOSE_CODE_MESSAGE.UPDATE];
    return response;
  }

  // async remove(id: number) {
  //   const response = new ResponseData();
  //   const meal = await this.repos.order.findOneBy({ id });
  //   if (!meal) {
  //     response.statusCode = HttpStatus.NOT_FOUND;
  //     response.message = [RESPOSE_CODE_MESSAGE.SERVICENOTEXIST];
  //     return response;
  //   }
  //   await this.repos.order.delete({ id });
  //   response.statusCode = HttpStatus.OK;
  //   response.message = [RESPOSE_CODE_MESSAGE.DELETE];
  //   return response;
  // }
}
