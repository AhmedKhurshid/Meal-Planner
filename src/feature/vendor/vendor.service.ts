import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { CoreService } from 'core/service';
import { throwForbiddenExceptionServiceName } from 'core/constant';
import { Vendor } from 'core/entities/vendor.entity';
import { ResponseData } from 'core/common/ResponseModel';
import { RESPOSE_CODE_MESSAGE, STATUS, VENDORSTATUS } from 'core/enums';
import { PageOptionDto } from './dto/pageOption.dto';
import { PageMeta } from './dto/pageMeta.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { MealPlan } from 'core/entities/mealPlan.entity';
import { Item } from 'core/entities/item.entity';
import { PageOptionsDtoInvoice } from 'feature/invoice/dto/pageOptionInvoice.dto';
import { Brackets } from 'typeorm';

@Injectable()
export class VendorService extends CoreService {
  async create(body: CreateVendorDto) {
    const email = await this.repos.vendor.findOneBy({
      email: body.email,
    });
    throwForbiddenExceptionServiceName(email);

    const vendor: Vendor = {
      name: body.name,
      email: body.email,
      address: body.address,
      status: VENDORSTATUS.ACTIVE,
      phone: body.phone,
      balance: body.balance,
      paid: body.paid,
      total: body.total,
    };
    const create = this.repos.vendor.create(vendor);
    await this.repos.vendor.save(create);

    const response = new ResponseData();
    response.statusCode = HttpStatus.OK;
    response.message = [RESPOSE_CODE_MESSAGE.NEWVENDOR];
    response.data = vendor;
    return response;
  }

  async findAll(pageOption: PageOptionDto) {
    const response = new ResponseData();
    const vendor = await this.repos.vendor
      .createQueryBuilder('vendor')
      .where(
        new Brackets((x) => {
          x.where('vendor.name LIKE :name', {
            name: `%${pageOption.search}%`,
          })
            .orWhere('vendor.email LIKE :email', {
              email: `%${pageOption.search}%`,
            })
            .orWhere('vendor.phone LIKE :phone', {
              phone: `%${pageOption.search}%`,
            });
        }),
      )
      .select([
        'vendor.id as id',
        'vendor.name as name',
        'vendor.email as email',
        'vendor.phone as phone',
        'vendor.status as status',
        'vendor.address as address',
        'vendor.paid as paid',
        'vendor.balance as balance',
        'vendor.total as total',
      ])
      .orderBy('vendor.createdAt', pageOption.order);

    const itemCount = await vendor.getCount();
    const entities = await vendor.getRawMany();

    const mainVendor = entities.slice(
      pageOption.skip,
      pageOption.pageNo * pageOption.pageSize,
    );
    const paginationDetail = new PageMeta({ itemCount, pageOption });

    response.statusCode = HttpStatus.OK;
    response.message = [RESPOSE_CODE_MESSAGE.VENDORFOUND];
    response.data = { paginationDetail, mainVendor };
    return response;
  }

  async findOne(id: number) {
    const response = new ResponseData();
    const vendor = await this.repos.vendor.findOneBy({ id });
    if (!vendor) {
      response.statusCode = HttpStatus.NOT_FOUND;
      response.message = [RESPOSE_CODE_MESSAGE.NOVENDOR];
      return response;
    }

    response.statusCode = HttpStatus.OK;
    response.message = [RESPOSE_CODE_MESSAGE.VENDORFOUND];
    response.data = vendor;

    return response;
  }
  async findAllWithOutPagination() {
    const response = new ResponseData();
    const vendor = await this.repos.vendor.find();
    if (!vendor) {
      response.statusCode = HttpStatus.NOT_FOUND;
      response.message = [RESPOSE_CODE_MESSAGE.NOVENDOR];
      return response;
    }
    response.statusCode = HttpStatus.OK;
    response.message = [RESPOSE_CODE_MESSAGE.VENDORFOUND];
    response.data = vendor;

    return response;
  }

  async update(id: number, body: UpdateVendorDto) {
    const response = new ResponseData();
    const vendor = await this.repos.vendor.findOneBy({ id: id });
    if (!vendor) {
      response.statusCode = HttpStatus.NOT_FOUND;
      response.message = [RESPOSE_CODE_MESSAGE.NOVENDOR];
      return response;
    } else {
      await this.repos.vendor.update(id, body);
      response.statusCode = HttpStatus.OK;
      response.message = [RESPOSE_CODE_MESSAGE.VENDORUPDATED];
    }
    return response;
  }

  // async remove(id: number) {
  //   const response = new ResponseData();
  //   const vendor = await this.repos.vendor.findOneBy({ id });
  //   if (!vendor) {
  //     response.statusCode = HttpStatus.NOT_FOUND;
  //     response.message = [RESPOSE_CODE_MESSAGE.NOVENDOR];
  //     return response;
  //   }

  //   response.statusCode = HttpStatus.OK;
  //   response.message = [RESPOSE_CODE_MESSAGE.DELETE];
  //   await this.repos.vendor.delete({ id });
  //   return response;
  // }

  async changeStatus({ status }: ChangeStatusDto, id: number) {
    const res = new ResponseData();
    const vendor = await this.repos.vendor.findOneBy({ id: id });
    if (!vendor) {
      res.statusCode = HttpStatus.NOT_FOUND;
      res.message = [RESPOSE_CODE_MESSAGE.NOVENDOR];
      return res;
    } else {
      try {
        await this.repos.vendor.update(id, { status });
        res.statusCode = HttpStatus.OK;
        res.message = [RESPOSE_CODE_MESSAGE.UPDATE];
        return res;
      } catch (e) {}
    }
  }

  async findVendor(pageOptionsDto: PageOptionsDtoInvoice) {
    const queryBuilder = this.repos.order
      .createQueryBuilder('order')
      .innerJoin(MealPlan, 'm', 'm.id = order.mealPlanId')
      .innerJoin(Item, 's', 's.id = m.itemId')
      // .innerJoin(User, 'u', 'u.id = order.userId')
      .innerJoin(Vendor, 'v', 'v.id = s.vendorId')
      .where(
        `order.status = "${STATUS.ACTIVE}" AND m.status = "${STATUS.ACTIVE}"`,
      )
      // .orWhere("(u.role = :role)", {
      //     role: ROLE.STUDENT || ROLE.STAFF,

      // })
      .select([
        // "order.status as status",
        // "order.time as date",
        // "DATE_FORMAT(order.time, '%Y-%m-%d') as orderedDate",
        // "m.status as mealStatus",
        // "m.date as mealPlanDate",
        "DATE_FORMAT(m.meal_date, '%Y-%m-%d') as mealDate", // Format the date here
        's.name as itemName',
        's.type as itemType',
        's.quantity as quantity',
        's.costPrice as costPrice',
        's.markupPrice as markupPrice',
        'v.id as vendorId',
        'v.name as vendorName',
        'v.email as vendorEmail',
        'v.phone as vendorPhone',
        'v.address as vendorAddress',
        'v.paid as vendorPaid',
        'v.balance as vendorBalance',
        'v.total as vendorTotal',
        // "v.gender as vendorGender",
      ]);

    if (pageOptionsDto.startDate && pageOptionsDto.endDate) {
      const entities = await queryBuilder.getRawMany();
      // console.log(queryBuilder.getSql());
      // console.log(queryBuilder.getParameters());

      const datedata = [];

      for (let index = 0; index < entities.length; index++) {
        const element = entities[index];

        // const timesSplit = element.date.toISOString().split('T')[0];

        const startDate = pageOptionsDto.startDate;
        const endDate = pageOptionsDto.endDate;

        // if (startDate <= timesSplit && endDate >= timesSplit) {
        if (startDate <= element.mealDate && endDate >= element.mealDate) {
          datedata.push(element);
          console.log('element.mealDate');
        }
      }
      // console.log(entities);
      // console.log(datedata);

      // process.exit(0)

      const response = new ResponseData();

      response.statusCode = HttpStatus.OK;
      response.message = [RESPOSE_CODE_MESSAGE.VENDORFOUND];
      response.data = datedata;
      return response;
    }
  }

  // async findVendor(pageOptionsDto: PageOptionsDtoInvoice) {
  //   const queryBuilder = this.repos.order
  //     .createQueryBuilder('order')
  //     .innerJoin(MealPlan, 'm', 'm.id = order.mealPlanId')
  //     .innerJoin(Item, 's', 's.id = m.itemId')
  //     // .innerJoin(User, 'u', 'u.id = order.userId')
  //     .innerJoin(Vendor, 'v', 'v.id = s.vendorId')
  //     .where(`order.status = "${STATUS.ACTIVE}"`)
  //     // .orWhere("(u.role = :role)", {
  //     // role: ROLE.STUDENT || ROLE.STAFF,

  //     // })
  //     .select([
  //       // "order.status as status",
  //       // "order.time as date",
  //       // "DATE_FORMAT(order.time, '%Y-%m-%d') as orderedDate",
  //       // "m.status as mealStatus",
  //       // "m.date as mealPlanDate",
  //       "DATE_FORMAT(m.meal_date, '%Y-%m-%d') as mealDate", // Format the date here
  //       's.name as itemName',
  //       's.type as itemType',
  //       's.quantity as quantity',
  //       's.costPrice as costPrice',
  //       's.markupPrice as markupPrice',
  //       'v.id as vendorId',
  //       'v.name as vendorName',
  //       'v.email as vendorEmail',
  //       'v.phone as vendorPhone',
  //       'v.address as vendorAddress',
  //       'v.paid as vendorPaid',
  //       'v.balance as vendorBalance',
  //       'v.total as vendorTotal',
  //       // "v.gender as vendorGender",
  //     ]);

  //   if (pageOptionsDto.startDate && pageOptionsDto.endDate) {
  //     const entities = await queryBuilder.getRawMany();
  //     console.log(queryBuilder.getSql());
  //     console.log(queryBuilder.getParameters());

  //     const datedata = [];

  //     for (let index = 0; index < entities.length; index++) {
  //       const element = entities[index];

  //       // const timesSplit = element.date.toISOString().split('T')[0];

  //       const startDate = pageOptionsDto.startDate;
  //       const endDate = pageOptionsDto.endDate;

  //       // if (startDate <= timesSplit && endDate >= timesSplit) {
  //       if (startDate <= element.mealDate && endDate >= element.mealDate) {
  //         datedata.push(element);
  //       }
  //     }
  //     const response = new ResponseData();

  //     response.statusCode = HttpStatus.OK;
  //     response.message = [RESPOSE_CODE_MESSAGE.VENDORFOUND];
  //     response.data = datedata;
  //     return response;
  //   }
  // }
}
