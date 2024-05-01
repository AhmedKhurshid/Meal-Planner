import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudenTtypeDto } from './dto/create-studen-ttype.dto';
import { UpdateStudenTtypeDto } from './dto/update-studen-ttype.dto';
import { CoreService } from 'core/service';
import { throwForbiddenExceptionServiceName } from 'core/constant';
import { ResponseData } from 'core/common/ResponseModel';
import { RESPOSE_CODE_MESSAGE } from 'core/enums';
import { StudentTpye } from 'core/entities/studentType.entity';
// import { PageOptionDto } from 'feature/vendor/dto/pageOption.dto';
// import { PageMeta } from 'feature/vendor/dto/pageMeta.dto';
import { PageMetaDto } from 'admin/dto/pageMeta.dto';
import { PageOptionsDto } from 'admin/dto/pageOption.dto';

@Injectable()
export class StudenTtypeService  extends CoreService {
 async create(body: CreateStudenTtypeDto) {

    const name = await this.repos.type.findOneBy({ name: body.name })
    throwForbiddenExceptionServiceName(name);

    const studentType: StudentTpye = {
      name: body.name
    }
    const create = this.repos.type.create(studentType);
    await this.repos.type.save(create);

    const res = new ResponseData();
    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    return res;
  }

 async findAll() {
    const res = new ResponseData();

    const service = await this.repos.type.find()
    if (service.length == 0) {
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.message = [RESPOSE_CODE_MESSAGE.TYPENOTFOUND];
      return res;
    }
    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    res.data = service
    return res;
  }

 async findOne(id: number) {
    const res = new ResponseData();

    const service = await this.repos.type.findOneBy({ id })
    if (!service) {
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.message = [RESPOSE_CODE_MESSAGE.TYPENOTFOUND];
      return res;
    }
    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    res.data = service
    return res;
  }

 async update(id: number, body: UpdateStudenTtypeDto) {
    const res = new ResponseData();

    const service = await this.repos.type.findOneBy({ id })
    if (!service) {
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.message = [RESPOSE_CODE_MESSAGE.TYPENOTFOUND];
      return res;
    }

    await this.repos.type.update(id, body)

    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.UPDATE];
    return res;
  }

 async remove(id: number) {
    const response = new ResponseData()
    const vendor = await this.repos.type.findOneBy({ id })
    const user = await this.repos.student.findOneBy({ typeId:id })
    
    if (!vendor) {
      response.statusCode = HttpStatus.NOT_FOUND
      response.message = [RESPOSE_CODE_MESSAGE.TYPENOTFOUND]
      return response
    }
    if (user) {
      response.statusCode = HttpStatus.BAD_REQUEST
      response.message = [RESPOSE_CODE_MESSAGE.TYPEUSEDINSTUDENT]
      return response
    }

    response.statusCode = HttpStatus.OK
    response.message = [RESPOSE_CODE_MESSAGE.DELETE]
    await this.repos.type.delete({ id })
    return response
  }

  public async getNotificationList(pageOptionsDto: PageOptionsDto) {
    const queryBuilder = await this.repos.type.createQueryBuilder("type")
      .where("(type.name LIKE :name)", { name: `%${pageOptionsDto.search}%` })
      .select([
        'type.id as id',
        'type.name as name'
      ]);

    queryBuilder.orderBy('type.createdAt', pageOptionsDto.order);

    const res = new ResponseData();

    const itemCount = await queryBuilder.getCount();
    const type = await queryBuilder.getRawMany();

    console.log(pageOptionsDto.enable);
    if (pageOptionsDto.enable == true) {
      console.log('reched');
      res.statusCode = HttpStatus.OK;
      res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
      res.data = { type };
      return res;
    }
    console.log('ssd');

    // console.log(pageOptionsDto.skip);
    // console.log(pageOptionsDto.PageSize);
    const types = type.slice(
      pageOptionsDto.skip,
      pageOptionsDto.PageSize * pageOptionsDto.pageNo,
    );

    const paginationDetail = new PageMetaDto({ itemCount, pageOptionsDto });

    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    res.data = { types, paginationDetail };
    return res;
  }

  
}
