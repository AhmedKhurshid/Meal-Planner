import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { UpdateAllergyDto } from './dto/update-allergy.dto';
import { CoreService } from 'core/service';
import { throwForbiddenExceptionallergy } from 'core/constant';
import { ResponseData } from 'core/common/ResponseModel';
import { RESPOSE_CODE_MESSAGE } from 'core/enums';
import { FoodAllergies } from 'core/entities/foodAllergy.entity';
import { AllergyPageOptionDto } from './dto/allergyPageOption.dto';
import { Brackets } from 'typeorm';
import { AllergyPageMeta } from './dto/allergyPageMeta.dto';

@Injectable()
export class AllergyService extends CoreService {
  async create(createAllergyDto: CreateAllergyDto) {
    const response = new ResponseData();
    const allergy = await this.repos.foodAllergies.findOneBy({
      allergy: createAllergyDto.allergy,
    });
    if (allergy) {
      throwForbiddenExceptionallergy(allergy);
    } else {
      const allergy: FoodAllergies = {
        allergy: createAllergyDto.allergy,
      };
      const create = this.repos.foodAllergies.create(allergy);
      await this.repos.foodAllergies.save(create);
      response.statusCode = HttpStatus.OK;
      response.message = [RESPOSE_CODE_MESSAGE.NEWALLERGY];
    }
    return response;
  }

  async findAll(allergyPageOption: AllergyPageOptionDto) {
    const response = new ResponseData();
    const allergy = await this.repos.foodAllergies
      .createQueryBuilder('food_allergies')
      .andWhere(
        new Brackets((x) => {
          x.where('food_allergies.allergy LIKE :name', {
            name: `%${allergyPageOption.seacrh}%`,
          });
          // .orWhere('item.type LIKE :type', {
          //   type: `%${allergyPageOption.seacrh}%`,
          // });
        }),
      )
      .select(['food_allergies.id as id', 'food_allergies.allergy as allergy'])
      .orderBy('food_allergies.createdAt', allergyPageOption.order);

    const itemCount = await allergy.getCount();
    const entities = await allergy.getRawMany();
    const paginationDetail = new AllergyPageMeta({
      itemCount,
      allergyPageOption,
    });
    const mainItem = entities.slice(
      allergyPageOption.skip,
      allergyPageOption.pageNo * allergyPageOption.pageSize,
    );
    response.statusCode = HttpStatus.OK;
    response.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    response.data = { paginationDetail, mainItem };
    return response;
  }

  async findAllwithoutPagination() {
    const response = new ResponseData();
    const allergy = await this.repos.foodAllergies.find();
    if (allergy.length == 0) {
      response.statusCode = HttpStatus.NOT_FOUND;
      response.message = [RESPOSE_CODE_MESSAGE.ALLERGYNOTFOUND];
    } else {
      response.statusCode = HttpStatus.ACCEPTED;
      response.message = [RESPOSE_CODE_MESSAGE.ALLERGYFOUND];
      response.data = allergy;
    }
    return response;
  }

  async findOne(id: number) {
    const response = new ResponseData();
    const allergy = await this.repos.foodAllergies.findOneBy({ id });
    if (!allergy) {
      response.statusCode = HttpStatus.NOT_FOUND;
      response.message = [RESPOSE_CODE_MESSAGE.ALLERGYNOTFOUND];
    } else {
      response.statusCode = HttpStatus.ACCEPTED;
      response.message = [RESPOSE_CODE_MESSAGE.ALLERGYFOUND];
      response.data = allergy;
    }
    return response;
  }

  async update(id: number, updateAllergyDto: UpdateAllergyDto) {
    const response = new ResponseData();
    const allergyId = await this.repos.foodAllergies.findOneBy({ id: id });
    if (!allergyId) {
      response.statusCode = HttpStatus.NOT_FOUND;
      response.message = [RESPOSE_CODE_MESSAGE.ALLERGYNOTFOUND];
    } else {
      await this.repos.foodAllergies.update(id, updateAllergyDto);
      response.statusCode = HttpStatus.ACCEPTED;
      response.message = [RESPOSE_CODE_MESSAGE.ALLERGYUPDATED];
    }
    return response;
  }

  remove(id: number) {
    return `This action removes a #${id} allergy`;
  }
}
