import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PaymentRequestService } from './payment-request.service';
import { CreatePaymentRequestDto } from './dto/create-payment-request.dto';
// import { UpdatePaymentRequestDto } from './dto/update-payment-request.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId, Roles } from 'core/decorators';
import { ROLE } from 'core/enums';

import { RequestPageOptionDto } from './dto/requestPageOption.dto';
import { UpdateStatusRequestDto } from './dto/update-status-request.dto';
import { UserRequstUpdateDto } from './dto/userRequstUpdate.dto';

@Controller('payment-request')
@ApiTags('payment-request')
export class PaymentRequestController {
  constructor(private readonly paymentRequestService: PaymentRequestService) {}

  @Roles(ROLE.STAFF, ROLE.STUDENT)
  @ApiBearerAuth()
  @Post('create')
  create(
    @GetCurrentUserId() id: number,
    @Body() createPaymentRequestDto: CreatePaymentRequestDto,
  ) {
    return this.paymentRequestService.create({ id }, createPaymentRequestDto);
  }

  @Get('list')
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  findAll(@Query() requestPageOptionDto: RequestPageOptionDto) {
    return this.paymentRequestService.findAll(requestPageOptionDto);
  }

  @Get('singleUserRequest')
  @Roles(ROLE.STAFF, ROLE.STUDENT)
  @ApiBearerAuth()
  singleUserRequest(
    @GetCurrentUserId() id: number,
    @Query() requestPageOptionDto: RequestPageOptionDto,
  ) {
    return this.paymentRequestService.singleUserRequest(
      id,
      requestPageOptionDto,
    );
  }

  @Get('singleUserRequestbyId/:id')
  @Roles(ROLE.STAFF, ROLE.STUDENT)
  @ApiBearerAuth()
  findOne(@GetCurrentUserId() userId: number, @Param('id') id: number) {
    return this.paymentRequestService.findOne(id, { userId });
  }

  @Patch('requestUpdate/:id')
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  update(
    @GetCurrentUserId() adminId: number,
    @Param('id') id: number,
    @Body()
    updatePaymentRequestDto: UpdateStatusRequestDto,
  ) {
    return this.paymentRequestService.update(id, updatePaymentRequestDto, {
      adminId,
    });
  }
  @Patch('userRequestUpdate/:id')
  @Roles(ROLE.STAFF, ROLE.STUDENT)
  @ApiBearerAuth()
  userRequstUpdate(
    @GetCurrentUserId() userId: number,
    @Param('id') id: number,
    @Body()
    userRequstUpdate: UserRequstUpdateDto,
  ) {
    return this.paymentRequestService.userRequstUpdate(id, userRequstUpdate, {
      userId,
    });
  }

  @Delete('requestDelete/:id')
  @Roles(ROLE.STAFF, ROLE.STUDENT)
  @ApiBearerAuth()
  remove(@Param('id') id: number, @GetCurrentUserId() userId: number) {
    return this.paymentRequestService.remove(id, { userId });
  }
}
