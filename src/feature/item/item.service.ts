import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from 'core/entities/item.entity';
import {
  throwForbiddenExceptionFoodAllergies,
  throwForbiddenExceptionAllergyNotFound,
  throwForbiddenExceptionServiceName,
  throwForbiddenExceptionVendorNotFound,
} from 'core/constant';
import { CoreService } from 'core/service';
import { ResponseData } from 'core/common/ResponseModel';
import { RESPOSE_CODE_MESSAGE, VENDORSTATUS } from 'core/enums';
import { ItemPageOptionDto } from './dto/itemPageOption.dto';
import { ItemPageMeta } from './dto/itemPageMeta.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { Vendor } from 'core/entities/vendor.entity';
import { Brackets } from 'typeorm';
import { ChangeMealType } from './dto/change-mealType.dto';

@Injectable()
export class ItemService extends CoreService {
  async create(addItem: CreateItemDto) {
    const response = new ResponseData();

    const existFoodAllergies = await this.repos.foodAllergies.findOneBy({ id: addItem.foodAllergyId });
    throwForbiddenExceptionFoodAllergies(existFoodAllergies);

    const vendor = await this.repos.vendor.findOneBy({ id: addItem.vendorId });
    const allergy = await this.repos.foodAllergies.findOneBy({
      id: addItem.foodAllergyId,
    });
    if (!vendor) {
      return throwForbiddenExceptionVendorNotFound(vendor);
    } else if (!allergy) {
      return throwForbiddenExceptionAllergyNotFound(allergy);
    } else {
      const name = await this.repos.item.findOneBy({ name: addItem.name });
      if (name) {
        throwForbiddenExceptionServiceName(name);
      } else {
        const item: Item = {
          name: addItem.name,
          type: addItem.type,
          quantity: addItem.quantity,
          costPrice: addItem.costPrice,
          markupPrice: addItem.markupPrice,
          foodAllergyId: addItem.foodAllergyId,
          image: addItem.image,
          userId: addItem.userId,
          vendorId: addItem.vendorId,
          status: addItem.status,
        };
        // process.exit(0)
        const create = this.repos.item.create(item);
        await this.repos.item.save(create);
        response.statusCode = HttpStatus.OK;
        response.message = [RESPOSE_CODE_MESSAGE.NEWITEM];
      }
    }
    return response;
  }

  async findAll(itemPageOption: ItemPageOptionDto) {
    const response = new ResponseData();
    const item = await this.repos.item
      .createQueryBuilder('item')
      .innerJoin(Vendor, 'vendor', 'vendor.id = item.vendorId ')
      .where(`vendor.status = "${VENDORSTATUS.ACTIVE}"`)
      .andWhere(
        new Brackets((x) => {
          x.where('item.name LIKE :name', {
            name: `%${itemPageOption.seacrh}%`,
          }).orWhere('item.type LIKE :type', {
            type: `%${itemPageOption.seacrh}%`,
          });
        }),
      )
      .select([
        'item.id as id',
        'item.name as name',
        'item.type as type',
        'item.mealType as mealType',
        'item.quantity as quantity',
        'item.costPrice as costPrice',
        'item.markupPrice as markupPrice',
        'item.foodAllergy as foodAllergy',
        'item.status as status',
        'item.image as image',
        'item.vendorId as vendorId',
        'vendor.id as vendorId',
        'vendor.status as vendor_status',
      ])
      .orderBy('item.createdAt', itemPageOption.order);

    const itemCount = await item.getCount();
    const entities = await item.getRawMany();
    const paginationDetail = new ItemPageMeta({ itemCount, itemPageOption });
    const mainItem = entities.slice(
      itemPageOption.skip,
      itemPageOption.pageNo * itemPageOption.pageSize,
    );
    response.statusCode = HttpStatus.OK;
    response.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    response.data = { paginationDetail, mainItem };
    return response;
  }

  async findWithoutPagintaion() {
    const response = new ResponseData();
    const item = await this.repos.item
      .createQueryBuilder('item')
      .innerJoin(Vendor, 'vendor', 'vendor.id = item.vendorId')
      .where(`vendor.status = '${VENDORSTATUS.ACTIVE}'`)
      .select([
        'item.id as id',
        'item.name as name',
        'item.type as type',
        'item.mealType as mealType',
        'item.quantity as quantity',
        'item.costPrice as costPrice',
        'item.markupPrice as markupPrice',
        'item.foodAllergy as foodAllergy',
        'item.status as status',
        'item.image as image',
        'item.vendorId as vendorId',
        'vendor.id as vendorId',
        'vendor.status as vendor_status',
      ])
      .getRawMany();

    // if (item.length == 0) {
    //   response.statusCode = HttpStatus.NOT_FOUND;
    //   response.message = [RESPOSE_CODE_MESSAGE.NOTFOUND];
    //   return response;
    // }
    response.statusCode = HttpStatus.ACCEPTED;
    response.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    response.data = item;
    return response;
  }

  async findOne(id: number) {
    const response = new ResponseData();
    const item = await this.repos.item.findOneBy({ id });

    if (!item) {
      response.statusCode = HttpStatus.NOT_FOUND;
      response.message = [RESPOSE_CODE_MESSAGE.NOTFOUND];
      return response;
    }
    response.statusCode = HttpStatus.ACCEPTED;
    response.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    response.data = item;
    return response;
  }

  async update(id: number, updateItem: UpdateItemDto) {
    const response = new ResponseData();
    const vendor = await this.repos.vendor.findOneBy({
      id: updateItem.vendorId,
    });
    if (!vendor) {
      response.statusCode = HttpStatus.NOT_FOUND;
      response.message = [RESPOSE_CODE_MESSAGE.NOVENDOR];
    } else {
      const item = await this.repos.item.findOneBy({ id: id });
      if (!item) {
        response.statusCode = HttpStatus.NOT_FOUND;
        response.message = [RESPOSE_CODE_MESSAGE.NOTFOUND];
        return response;
      } else {
        await this.repos.item.update(id, updateItem);
        response.statusCode = HttpStatus.OK;
        response.message = [RESPOSE_CODE_MESSAGE.UPDATE];
      }
    }
    return response;
  }

  // async remove(id: number) {
  //   const response = new ResponseData();
  //   const item = await this.repos.item.findOneBy({ id });
  //   if (!item) {
  //     response.statusCode = HttpStatus.NOT_FOUND;
  //     response.message = [RESPOSE_CODE_MESSAGE.NOTFOUND];
  //     return response;
  //   }
  //   await this.repos.item.delete({ id });
  //   response.statusCode = HttpStatus.OK;
  //   response.message = [RESPOSE_CODE_MESSAGE.DELETE];
  //   return response;
  // }
  async changeStatus({ status }: ChangeStatusDto, id: number) {
    const response = new ResponseData();
    const item = await this.repos.item.findOneBy({ id: id });
    if (!item) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.message = [RESPOSE_CODE_MESSAGE.NOTFOUND];
    } else {
      try {
        await this.repos.item.update(id, { status });
        response.statusCode = HttpStatus.OK;
        response.message = [RESPOSE_CODE_MESSAGE.UPDATE];
      } catch (e) {}
    }
    return response;
  }

  async changeMealType({ mealType }: ChangeMealType, id: number) {
    const response = new ResponseData();
    const item = await this.repos.item.findOneBy({ id: id });
    if (!item) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.message = [RESPOSE_CODE_MESSAGE.NOTFOUND];
    } else {
      try {
        await this.repos.item.update(id, { mealType });
        response.statusCode = HttpStatus.OK;
        response.message = [RESPOSE_CODE_MESSAGE.UPDATE];
      } catch (e) {}
    }
  }
}
