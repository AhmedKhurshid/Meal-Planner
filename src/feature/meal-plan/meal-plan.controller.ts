import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Put,
} from '@nestjs/common';
import { MealPlanService } from './meal-plan.service';
import { CreateMealPlanDto } from './dto/create-meal-plan.dto';
import { UpdateMealPlanDto } from './dto/update-meal-plan.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'core/decorators';

import { ROLE } from 'core/enums';
import { ItemPageOptionDto } from './dto/itemPageOption.dto';
// import { ChangeStatusDto } from './dto/change-status.dto';
import { ApiResponseBody } from 'core/common/testing';
import { MealPlan } from './ResponseModel/mealPlan-detail.dto';

@Controller('meal-plan')
@ApiTags('meal-plan')
export class MealPlanController {
  constructor(public mealPlanService: MealPlanService) {}

  @Post('create')
  @ApiBearerAuth()
  @Roles(ROLE.ADMIN)
  @ApiResponseBody(MealPlan)
  async create(@Body() createMealPlanDto: CreateMealPlanDto) {
    return await this.mealPlanService.create(createMealPlanDto);
  }

  @Get('lists')
  @ApiBearerAuth()
  @Roles(ROLE.ADMIN, ROLE.STUDENT, ROLE.STAFF)
  async findWithoutPagination() {
    return await this.mealPlanService.findWithoutPagination();
  }

  @Get('currentDate')
  @ApiBearerAuth()
  @Roles(ROLE.ADMIN, ROLE.STUDENT, ROLE.STAFF)
  async currentDate() {
    return await this.mealPlanService.currentDate();
  }

  @Get('list')
  @ApiBearerAuth()
  @Roles(ROLE.ADMIN, ROLE.STUDENT, ROLE.STAFF)
  async findAll(@Query() body: ItemPageOptionDto) {
    return await this.mealPlanService.findAll(body);
  }

  @Get('list/:id')
  @ApiBearerAuth()
  @Roles(ROLE.ADMIN, ROLE.STUDENT, ROLE.STAFF)
  async findOne(@Param('id') id: number) {
    return await this.mealPlanService.findOne(id);
  }

  @Put('update/:id')
  @ApiBearerAuth()
  @Roles(ROLE.ADMIN)
  async update(
    @Param('id') id: number,
    @Body() updateMealPlanDto: UpdateMealPlanDto,
  ) {
    return await this.mealPlanService.update(id, updateMealPlanDto);
  }

  // @Delete('delete/:id') 
  // @ApiBearerAuth()
  // @Roles(ROLE.ADMIN)
  // async remove(@Param('id') id: number) {
  //   return await this.mealPlanService.remove(id);
  // }

  @Patch('changeStatus/:id')
  @ApiBearerAuth()
  @Roles(ROLE.ADMIN)
  async changeStatus(
    // @Body() updateStatus: ChangeStatusDto,
    @Param('id') id: number,
  ) {
    return await this.mealPlanService.updateStatus(id);
  }
}
