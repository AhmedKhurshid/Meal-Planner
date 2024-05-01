import { HttpStatus, Injectable } from '@nestjs/common';
import { CoreService } from 'core/service';
import { CreatePaymentRequestDto } from './dto/create-payment-request.dto';
import { ResponseData } from 'core/common/ResponseModel';
import {
  PAYMENTREQUEST,
  RESPOSE_CODE_MESSAGE,
} from 'core/enums';
import { PaymentRequest } from 'core/entities/paymentRequest.entity';
import { RequestPageOptionDto } from './dto/requestPageOption.dto';
import { User } from 'core/entities';
import { Brackets } from 'typeorm';
import { RequestPageMeta } from './dto/requestPageMeta.dto';
import { UpdateStatusRequestDto } from './dto/update-status-request.dto';
import { UserRequstUpdateDto } from './dto/userRequstUpdate.dto';

@Injectable()
export class PaymentRequestService extends CoreService {
  async create({ id }, createPaymentRequestDto: CreatePaymentRequestDto) {
    const user = await this.repos.user.findOneBy({ id: id });
    const response = new ResponseData();
    if (!user) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.message = [RESPOSE_CODE_MESSAGE.NOTFOUND]; 
    } else {
      const payemetRequests: PaymentRequest = {
        amount: createPaymentRequestDto.amount,
        status: PAYMENTREQUEST.PENDING,
        userId: user.id,
        adminId: null,
      };
      const create = await this.repos.payemetRequest.create(payemetRequests);
      try {
        await this.repos.payemetRequest.save(create);
        response.statusCode = HttpStatus.OK;
        response.message = [RESPOSE_CODE_MESSAGE.NEWREQUEST];
        response.data = payemetRequests;
        // await this.repos.
      } catch (e) {}
    }
    return response;
    // return 'This action adds a new paymentRequest';
  }

  async findAll(requestPageOption: RequestPageOptionDto) {
    const response = new ResponseData();
    const payemetRequest = await this.repos.payemetRequest
      .createQueryBuilder('payment_request')
      .innerJoin(User, 'user', 'payment_request.userId = user.id')
      .andWhere(
        new Brackets((x) => {
          x.where('user.name LIKE :name', {
            name: `%${requestPageOption.seacrh}%`,
          });
          // .orWhere('item.type LIKE :type', {
          //   type: `%${requestPageOption.seacrh}%`,
          // });
        }),
      )
      .select([
        'payment_request.id as id',
        'payment_request.amount as amount',
        'payment_request.status as status',
        'payment_request.adminId as adminId',
        'payment_request.userId as userId',
        'user.name as Username',
      ])
      .orderBy('payment_request.createdAt', requestPageOption.order);

    const itemCount = await payemetRequest.getCount();
    const entities = await payemetRequest.getRawMany();
    const paginationDetail = new RequestPageMeta({
      itemCount,
      requestPageOption,
    });
    const mainItem = entities.slice(
      requestPageOption.skip,
      requestPageOption.pageNo * requestPageOption.pageSize,
    );
    response.statusCode = HttpStatus.OK;
    response.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    response.data = { paginationDetail, mainItem };
    return response;
  }

  async singleUserRequest(id: number, requestPageOption: RequestPageOptionDto) {
    const response = new ResponseData();
    const payemetRequest = await this.repos.payemetRequest
      .createQueryBuilder('payment_request')
      .where(`payment_request.userId = ${id}`)
      .innerJoin(User, 'user', 'payment_request.userId = user.id')
      .andWhere(
        new Brackets((x) => {
          x.where('user.name LIKE :name', {
            name: `%${requestPageOption.seacrh}%`,
          });
          // .orWhere('item.type LIKE :type', {
          //   type: `%${requestPageOption.seacrh}%`,
          // });
        }),
      )
      .select([
        'payment_request.id as id',
        'payment_request.amount as amount',
        'payment_request.status as status',
        'payment_request.adminId as adminId',
        'payment_request.userId as userId',
      ])
      .orderBy('payment_request.createdAt', requestPageOption.order);

    const itemCount = await payemetRequest.getCount();
    const entities = await payemetRequest.getRawMany();
    const paginationDetail = new RequestPageMeta({
      itemCount,
      requestPageOption,
    });
    const mainItem = entities.slice(
      requestPageOption.skip,
      requestPageOption.pageNo * requestPageOption.pageSize,
    );
    response.statusCode = HttpStatus.OK;
    response.message = [RESPOSE_CODE_MESSAGE.ACCEPT];
    response.data = { paginationDetail, mainItem };
    return response;
  }

  async findOne(id: number, { userId }) {
    console.log(userId);
    const response = new ResponseData();
    const payemetRequest = await this.repos.payemetRequest.findOneBy({
      id: id,
    });
    if (!payemetRequest) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.message = [RESPOSE_CODE_MESSAGE.NOREQUEST];
    } else {
      response.statusCode = HttpStatus.ACCEPTED;
      response.message = [RESPOSE_CODE_MESSAGE.UPDATE];
      response.data = payemetRequest;
    }
    return response;
  }

  async update(id: number, { status }: UpdateStatusRequestDto, { adminId }) {
    const response = new ResponseData();
    const payemetRequest = await this.repos.payemetRequest.findOneBy({
      id: id,
    });
    if (!payemetRequest) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.message = [RESPOSE_CODE_MESSAGE.NOREQUEST];
    } else {
      this.repos.payemetRequest.update(id, { status, adminId });
      response.statusCode = HttpStatus.ACCEPTED;
      response.message = [RESPOSE_CODE_MESSAGE.UPDATE];
    }
    return response;
  }

  async userRequstUpdate(
    id: number,
    { amount }: UserRequstUpdateDto,
    { userId },
  ) {
    console.log(userId);
    const response = new ResponseData();
    const payemetRequest = await this.repos.payemetRequest.findOneBy({
      id: id,
    });
    if (!payemetRequest) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.message = [RESPOSE_CODE_MESSAGE.NOREQUEST];
    } else {
      this.repos.payemetRequest.update(id, { amount });
      response.statusCode = HttpStatus.ACCEPTED;
      response.message = [RESPOSE_CODE_MESSAGE.UPDATE];
    }
    return response;
  }
  async remove(id: number, { userId }) {
    console.log(userId);
    const response = new ResponseData();
    const payemetRequest = await this.repos.payemetRequest.findOneBy({
      id: id,
    });
    if (!payemetRequest) {
      response.statusCode = HttpStatus.BAD_REQUEST;
      response.message = [RESPOSE_CODE_MESSAGE.NOREQUEST];
    } else {
      this.repos.payemetRequest.delete(id);
      response.statusCode = HttpStatus.ACCEPTED;
      response.message = [RESPOSE_CODE_MESSAGE.DELETE];
    }
    return response;
  }
}
