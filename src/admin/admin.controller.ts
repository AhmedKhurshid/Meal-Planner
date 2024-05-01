import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId, Public, Roles } from 'core/decorators';

import { ROLE } from 'core/enums';
import { AdminService } from './admin.service';
import { ChangeStatusDto } from './dto';
import { Delete, UseInterceptors } from '@nestjs/common/decorators';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { Tokens } from 'auth/types';
import { HandleUniqueError } from 'core/error/HandleUniqueError';
import { AdminLawyerDto } from './dto/adminLawyer.dto';
import { PageOptionsDto } from './dto/pageOption.dto';
import { CreateDto } from 'core/base';
import { CreateStudentDto } from 'feature/student/dto/create-student.dto';
import { UpdateItemDto } from 'feature/item/dto/create-item.dto';
import { UpdateStudentDto } from 'feature/student/dto/update-student.dto';

@Controller('admin')
@ApiTags('admin')
export class AdminController {
  constructor(public _ss: AdminService) { }

  @Patch('student/change/status/:id')
  @Roles(ROLE.ADMIN)
  // @Public()
  @ApiBearerAuth()
  changeLawyerStatus(@Body() body: ChangeStatusDto, @Param('id') id: number) {
    return this._ss.changeStatusUser(body, id);
  }

  @Patch('update/student/:id')
  @Roles(ROLE.ADMIN)
  // @Public()
  @ApiBearerAuth()
  updateStudentInfo(@Body() body: UpdateStudentDto, @Param('id') id: number) {
    return this._ss.updateStudentInfo(body, id);
  }

  @Get('student')
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  getLawyers() {
    return this._ss.getLawyers();
  }

  @Get('student/:id')
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  getLawyer(@Param('id') id: number) {
    return this._ss.getLawyer(id);
  }

  @Roles(ROLE.ADMIN)
  @Post('student/signUp')
  signupLawyer(@Body() body: AdminLawyerDto): Promise<Tokens> {
    try {
      return this._ss.signUpLawyer(body);
    } catch (e) {
      HandleUniqueError(e);
    }
  }

  @Get('list/student')
  @Roles(ROLE.ADMIN)
  // @Public()
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  async suggestionList(@Query() pageOptionsDto: PageOptionsDto) {
    return await this._ss.getLawyerList(pageOptionsDto);
  }

  @Get('list/service/form')
  // @Roles(ROLE.ADMIN)
  @Public()
  @ApiBearerAuth()
  async getServiceFormList(@Query() pageOptionsDto: PageOptionsDto) {
    return await this._ss.getServiceFormList(pageOptionsDto);
  }


  @Post('create/notification')
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  create(@Body() createCaseLawDto: CreateDto) {
    return this._ss.createNotification(createCaseLawDto);
  }

  @Delete('delete/notification/:id')
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  delete(@Param('id') id: number) {
    return this._ss.deleteNotification(id);
  }

  @Get('list/notification')
  @Roles(ROLE.ADMIN, ROLE.STUDENT)
  @ApiBearerAuth()
  async Notification(@Query() pageOptionsDto: PageOptionsDto) {
    return await this._ss.getNotificationList(pageOptionsDto);
  }
}
