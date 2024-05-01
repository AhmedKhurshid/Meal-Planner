import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateServiceDto, UpdateServiceDto } from './dto/create-service.dto';
import { CoreService } from 'core/service';
import { ENV, throwForbiddenExceptionServiceName } from 'core/constant';
import { Service } from 'core/entities/service.entity';
import { ResponseData } from 'core/common/ResponseModel';
import { RESPOSE_CODE_MESSAGE } from 'core/enums';
import { CreateServiceFormDto } from './dto/createServiceForm.dto';
import { ServiceForm } from 'core/entities/serviceForm.entity';
import { ContactUsDto } from './dto/createAboutUs.dto';

@Injectable()
export class ServiceService extends CoreService {
  async create(body: CreateServiceDto) {

    const name = await this.repos.service.findOneBy({ name: body.name })
    throwForbiddenExceptionServiceName(name);

    const service: Service = {
      name: body.name,
      image: body.image,
      type: body.type
    }
    const create = this.repos.service.create(service);
    await this.repos.service.save(create);

    const res = new ResponseData();
    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    return res;

  }

  async createForm(body: CreateServiceFormDto) {
    const res = new ResponseData();

    const service = await this.repos.service.findOneBy({ id: body.serviceId })
    if (!service) {
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.message = [RESPOSE_CODE_MESSAGE.SERVICENOTEXIST];
      return res;
    }
    const serviceForm: ServiceForm = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      type: body.type,
      // city: body.city,
      mobile: body.mobile,
      serviceId: body.serviceId,
      date: body.date,
      time: body.time,
      // desc: body.description,
    }
    const create = this.repos.serviceForm.create(serviceForm);
    await this.repos.serviceForm.save(create);
    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    return res;

  }

  async createContact(body: ContactUsDto) {
    const res = new ResponseData();

    await this.mail.contactUs({
      to:ENV.MAIL_FROM,
      subject:body.subject,
      name:body.name,
      email:body.email,
      message:body.message
    })

    // const create = this.repos.serviceForm.create(serviceForm);
    // await this.repos.serviceForm.save(create);
    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    return res;

  }

  async findAll() {
    const res = new ResponseData();

    const service = await this.repos.service.find()
    if (service.length == 0) {
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.message = [RESPOSE_CODE_MESSAGE.SERVICENOTEXIST];
      return res;
    }
    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    res.data = service
    return res;

  }

  async findOne(id: number) {
    const res = new ResponseData();

    const service = await this.repos.service.findOneBy({ id })
    if (!service) {
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.message = [RESPOSE_CODE_MESSAGE.SERVICENOTEXIST];
      return res;
    }
    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    res.data = service
    return res;
  }

  async update(id: number, body: UpdateServiceDto) {
    const res = new ResponseData();

    const service = await this.repos.service.findOneBy({ id })
    if (!service) {
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.message = [RESPOSE_CODE_MESSAGE.SERVICENOTEXIST];
      return res;
    }

    await this.repos.service.update(id, body)

    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.UPDATE];
    return res;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
