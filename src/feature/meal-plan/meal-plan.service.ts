import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateMealPlanDto } from './dto/create-meal-plan.dto';
import { CoreService } from 'core/service';
import { MealPlan } from 'core/entities/mealPlan.entity';
import { ResponseData } from 'core/common/ResponseModel';
import { RESPOSE_CODE_MESSAGE } from 'core/enums';
import { Item } from 'core/entities/item.entity';
import { ItemPageMeta } from './dto/itemPageMeta.dto';
// import { ChangeStatusDto } from './dto/change-status.dto';
import { ItemPageOptionDto } from './dto/itemPageOption.dto';
import { Brackets } from 'typeorm';
import { Vendor } from 'core/entities/vendor.entity';
import {
  throwForbiddenExceptionDateNotMatch,
  throwForbiddenExceptionNotFound,
  throwForbiddenExceptionPreviosDate,
  throwForbiddenMealPlanError,
} from 'core/constant';
import { UpdateMealPlanDto } from './dto/update-meal-plan.dto';
import { FoodAllergies } from 'core/entities/foodAllergy.entity';

@Injectable()
export class MealPlanService extends CoreService {
  async create(itemPageOption: CreateMealPlanDto) {
    const response = new ResponseData();
    const date = new Date();
    const isoFormat = date.toISOString().split('T')[0];
    const inputDate = itemPageOption.meal_date;
    if (inputDate.toString() >= isoFormat) {
      const item = await this.repos.item.findOneBy({
        id: itemPageOption.item_id,
      });
      if (!item) {
        throwForbiddenExceptionNotFound(item);
        response.statusCode = HttpStatus.BAD_REQUEST;
        response.message = [RESPOSE_CODE_MESSAGE.NOTFOUND];
      } else {
        const existingPlan = await this.repos.mealPlan.findOneBy({
          itemId: itemPageOption.item_id,
          meal_date: itemPageOption.meal_date,
        });
        if (existingPlan) {
          // response.statusCode = HttpStatus.BAD_REQUEST;
          // response.message = [RESPOSE_CODE_MESSAGE.MEALPLANALREADYEXIT];
          throwForbiddenMealPlanError(existingPlan);
        } else {
          await this.repos.mealPlan.findOneBy({
            status: itemPageOption.status,
          });

          const Plan: MealPlan = {
            status: itemPageOption.status,
            itemId: itemPageOption.item_id,
            meal_date: itemPageOption.meal_date,
          };

          const create = this.repos.mealPlan.create(Plan);
          await this.repos.mealPlan.save(create);

          response.statusCode = HttpStatus.OK;
          response.message = [RESPOSE_CODE_MESSAGE.NEWMEALPLAN];
          response.data = Plan;
        }
      }
    } else {
      throwForbiddenExceptionDateNotMatch(inputDate);
    }
    return response;
  }

  async findWithoutPagination() {
    const mealPlan = await this.repos.mealPlan
      .createQueryBuilder('meal_plan')
      .innerJoin(Item, 'item', 'item.id = meal_plan.itemId')
      .innerJoin(Vendor, 'vendor', 'vendor.id = item.vendorId')
      .select([
        'meal_plan.id as id',
        'meal_plan.status as status',
        // 'TO_CHAR(meal_plan.meal_date::DATE, dd-mm-yyyy) as meal_date',
        // 'meal_plan.meal_date as meal_date',
        "DATE_FORMAT(meal_plan.meal_date, '%Y-%m-%d') as mealDate", // Format the date here
        'item.id as item_id',
        'item.name as name',
        'item.type as type',
        'item.foodAllergy as foodAllergy',
        'item.quantity as quantity',
        'item.costPrice as costPrice',
        'item.markupPrice as markupPrice',
        'item.image as image',
        'vendor.name as vendorName',
      ])
      .where('meal_plan.itemId = item.id')
      .andWhere("meal_plan.status = 'Active'")
      .getRawMany();
    const response = new ResponseData();

    if (!mealPlan) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.message = [RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
    }

    response.statusCode = HttpStatus.OK;
    response.message = [RESPOSE_CODE_MESSAGE.MEALPLANFOUND];
    response.data = mealPlan;

    return response;
  }

  async currentDate() {
    const date = new Date();
    // const isoFormat = date.toISOString().split('T')[0];
    const year = date.getFullYear(); // Get the current year (4 digits)
    const month = date.getMonth() + 1; // Get the current month (0-11), adding 1 to match typical month numbering (1-12)
    const day = date.getDate();
    const isoFormat = `${year}-${month}-${day}`;
    // console.log(isoFormat);
    const mealPlan = await this.repos.mealPlan
      .createQueryBuilder('meal_plan')
      .innerJoin(Item, 'item', 'item.id = meal_plan.itemId')
      .innerJoin(Vendor, 'vendor', 'vendor.id = item.vendorId')
      .innerJoin(
        FoodAllergies,
        'food_allergies',
        'item.foodAllergy = food_allergies.id',
      )
      .select([
        'meal_plan.id as id',
        'meal_plan.status as status',
        "DATE_FORMAT(meal_plan.meal_date, '%Y-%m-%d') as mealDate", // Format the date here
        'item.id as item_id',
        'item.name as name',
        'item.type as type',
        'item.foodAllergy as foodAllergyId',
        'item.quantity as quantity',
        'item.costPrice as costPrice',
        'item.markupPrice as markupPrice',
        'item.image as image',
        'vendor.name as vendorName',
        'food_allergies.allergy as foodAllergyName'

        // 'vendor.status as vendorStatus',
      ])
      .where(`meal_plan.meal_date = "${isoFormat}"`)
      .andWhere('meal_plan.itemId = item.id')
      .andWhere(`meal_plan.status = "Active"`)
      // .andWhere(`meal_plan.itemId = ${VENDORSTATUS.ACTIVE}`)
      .orderBy()
      .getRawMany();
      

    // const itemCount = await mealPlan.getCount();
    // const entities = await mealPlan.getRawMany();
    // const paginationDetail = new ItemPageMeta({ itemCount, itemPageOption });
    // const mainItem = entities.slice(
    //   itemPageOption.skip,
    //   itemPageOption.pageNo * itemPageOption.pageSize,
    // );

    const response = new ResponseData();
    if (!mealPlan) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.message = [RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
    } else if (mealPlan.length == 0) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.message = [RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
    } else {
      response.statusCode = HttpStatus.OK;
      response.message = [RESPOSE_CODE_MESSAGE.MEALPLANFOUND];
      response.data = mealPlan;
    }

    return response;
  }

  async findAll(itemPageOption: ItemPageOptionDto) {
    const mealPlan = await this.repos.mealPlan
      .createQueryBuilder('meal_plan')
      // .innerJoin('meal_plan.item', 'item')
      .innerJoin(Item, 'item', 'item.id = meal_plan.itemId')
      .innerJoin(Vendor, 'vendor', 'vendor.id = item.vendorId')
      .where(`meal_plan.status ='${itemPageOption.status}'`)
      .andWhere(
        new Brackets((x) => {
          x.where('meal_plan.meal_date LIKE :datesearch', {
            datesearch: `%${itemPageOption.dateSearch}%`,
          });
        }),
      )
      .select([
        'meal_plan.id as id',
        'meal_plan.status as status',
        // 'TO_CHAR(meal_plan.meal_date::DATE, dd-mm-yyyy) as meal_date',
        // 'meal_plan.meal_date as meal_date',
        "DATE_FORMAT(meal_plan.meal_date, '%Y-%m-%d') as mealDate", // Format the date here
        'item.id as item_id',
        'item.name as name',
        'item.type as type',
        'item.foodAllergy as foodAllergy',
        'item.quantity as quantity',
        'item.costPrice as costPrice',
        'item.markupPrice as markupPrice',
        'item.image as image',
        'vendor.name as vendorName',
      ])

      .orderBy('meal_plan.meal_date', itemPageOption.order);

    const itemCount = await mealPlan.getCount();
    const entities = await mealPlan.getRawMany();
    const paginationDetail = new ItemPageMeta({ itemCount, itemPageOption });
    const mainItem = entities.slice(
      itemPageOption.skip,
      itemPageOption.pageNo * itemPageOption.pageSize,
    );

    const response = new ResponseData();

    if (!entities) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.message = [RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
    } else if (entities.length == 0) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.message = [RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
    } else {
      response.statusCode = HttpStatus.OK;
      response.message = [RESPOSE_CODE_MESSAGE.MEALPLANFOUND];
      response.data = { paginationDetail, mainItem };
    }

    return response;
  }

  async findOne(id: number) {
    const mealPlan = await this.repos.mealPlan
      .createQueryBuilder('meal_plan')
      .innerJoin(Item, 'item', 'item.id = meal_plan.itemId')
      .select([
        'meal_plan.id as id',
        'meal_plan.status as status',
        "DATE_FORMAT(meal_plan.meal_date, '%Y-%m-%d') as mealDate",
        'item.id as item_id',
        'item.name as name',
        'item.type as type',
        'item.foodAllergy as foodAllergy',
        'item.quantity as quantity',
        'item.costPrice as costPrice',
        'item.markupPrice as markupPrice',
        'item.image as image',
      ])
      .where('meal_plan.itemId = item.id')
      .andWhere(`meal_plan.id = ${id}`);
    const entities = await mealPlan.getRawMany();
    const response = new ResponseData();
    if (entities.length == 0) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.message = [RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
    } else {
      response.statusCode = HttpStatus.OK;
      response.message = [RESPOSE_CODE_MESSAGE.MEALPLANFOUND];
      response.data = entities;
    }
    return response;
  }

  async update(id: number, data: UpdateMealPlanDto) {
    const response = new ResponseData();
    try {
      const item = await this.repos.item.findOneBy({ id: data.item_id });
      const date = new Date();
      const isoFormat = date.toISOString().split('T')[0];
      const inputDate = data.meal_date;
      if (inputDate.toString() >= isoFormat) {
        if (!item) {
          response.statusCode = HttpStatus.BAD_REQUEST;
          response.message = [RESPOSE_CODE_MESSAGE.NOTFOUND];
        } else {
          const mealPlan = await this.repos.mealPlan.findOneBy({ id: id });
          if (!mealPlan) {
            response.statusCode = HttpStatus.BAD_REQUEST;
            response.message = [RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
          } else {
            await this.repos.mealPlan.update(id, {
              status: data.status,
              meal_date: data.meal_date,
              itemId: data.item_id,
            });
            response.statusCode = HttpStatus.OK;
            response.message = [RESPOSE_CODE_MESSAGE.MEALPLANUPDATED];
          }
        }
      } else {
        return throwForbiddenExceptionDateNotMatch(inputDate);
      }
    } catch {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.message = [RESPOSE_CODE_MESSAGE.DATEERROR];
    }
    return response;
  }

  async remove(id: number) {
    const order = await this.repos.order.findOneBy({ mealPlanId: id });
    const response = new ResponseData();
    if (order) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.message = [RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
    } else {
      const mealPlan = await this.repos.mealPlan
        .createQueryBuilder('meal_plan')
        .where(`meal_plan.id = ${id}`)
        .getRawMany();

      if (mealPlan.length == 0) {
        response.statusCode = HttpStatus.BAD_REQUEST;
        response.message = [RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
      } else if (!mealPlan) {
        response.statusCode = HttpStatus.BAD_REQUEST;
        response.message = [RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
      } else {
        response.statusCode = HttpStatus.OK;
        response.message = [RESPOSE_CODE_MESSAGE.DELETE];
        response.data;
      }
      await this.repos.mealPlan.delete({ id });
    }
  }

  async updateStatus(id: number) {
    const mealPlan = await this.repos.mealPlan.findOneBy({ id: id });
    const response = new ResponseData();
    const date = new Date();
    const isoFormat = date.toISOString().split('T')[0];
    const mealDate = mealPlan.meal_date;

    if (!mealPlan) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.message = [RESPOSE_CODE_MESSAGE.NOMEALPLANFOUND];
    } else {
      if (isoFormat < mealDate.toString()) {
        await this.repos.mealPlan.delete(id);
        response.statusCode = HttpStatus.OK;
        response.message = [RESPOSE_CODE_MESSAGE.MEALPLANUPDATED];
      } else {
        return throwForbiddenExceptionPreviosDate(mealPlan);
      }
    }
    return response;
  }
}
