import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto, UpdateMealDto } from './dto/create-meal.dto';
// import { UpdateMealDto } from './dto/update-meal.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId, Roles } from 'core/decorators';
import { ROLE } from 'core/enums';

import { PageOptionsDtoOrder } from './dto/pageOptionOrder.dto';

@Controller('meal')
@ApiTags('mealOrder')
export class MealController {
  constructor(public mealService: MealService) {}
  @Post('order')
  @Roles(ROLE.STUDENT, ROLE.STAFF)
  // @ApiResponseBody('')
  @ApiBearerAuth()
  create(@GetCurrentUserId() id: number, @Body() createMealDto: CreateMealDto) {
    createMealDto.userId = id;
    return this.mealService.create(createMealDto);
  }

  @Get('user/list')
  @Roles(ROLE.STUDENT, ROLE.STAFF)
  @ApiBearerAuth()
  async findAllUserMeal(@GetCurrentUserId() id: number, @Query() pageOptionsDto: PageOptionsDtoOrder) {
    return await this.mealService.findAllUserMeal({ id }, pageOptionsDto);
  }

  @Get('list')
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  async findAll(@Query() pageOptionsDto: PageOptionsDtoOrder) {
    return await this.mealService.findAll(pageOptionsDto);
  }

  // @Get('list/:id')
  // @Roles(ROLE.ADMIN, ROLE.STUDENT, ROLE.STAFF)
  // @ApiBearerAuth()
  // async findOne(@Param('id') id: number) {
  //   return await this.mealService.findOne(id);
  // }
  @Patch('update/order/:id')
  @Roles(ROLE.STAFF, ROLE.STUDENT)
  @ApiBearerAuth()
  async updateByUser(
    @GetCurrentUserId() id: number,
    @Param('id') idd: number,
    @Body() updateMealDto: UpdateMealDto,
  ) {
    updateMealDto.userId = id;
    return this.mealService.updateByUser(idd, updateMealDto);
  }

  // @Patch('update/order/:id')
  // @Roles(ROLE.STAFF, ROLE.STUDENT)
  // @ApiBearerAuth()
  // async updateByUser(@GetCurrentUserId() id: number, @Param('id') idd: number, @Body() updateMealDto: UpdateMealDto) {
  //   updateMealDto.userId = id
  //   return this.mealService.updateByUser(idd, updateMealDto);
  // }

  @Patch('update/:id')
  @Roles(ROLE.ADMIN, ROLE.STUDENT)
  @ApiBearerAuth()
  async updateByAdmin(@Param('id') id: number, @Body() updateMealDto: UpdateMealDto) {
    return this.mealService.updateByAdmin(id, updateMealDto);
  }

  // @Delete('delete/:id')
  // @Roles(ROLE.ADMIN)
  // @ApiBearerAuth()
  // remove(@Param('id') id: number) {
  //   return this.mealService.remove(id);
  // }
}
