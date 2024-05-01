import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  // Delete,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
  Patch,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { GetCurrentUserId, Roles } from 'core/decorators';
import { ROLE } from 'core/enums';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiResponseBody } from 'core/common/testing';
import { ItemInfo } from './ResponseModel/item.info.dto';
import { ItemPageOptionDto } from './dto/itemPageOption.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { ChangeMealType } from './dto/change-mealType.dto';

@Controller('item')
@ApiTags('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('create')
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  @ApiResponseBody(ItemInfo)
  async create(
    @Body() createItemDto: CreateItemDto,
    @GetCurrentUserId() id: number,
  ) {
    createItemDto.userId = id;
    return await this.itemService.create(createItemDto);
  }

  @Get('list')
  @Roles(ROLE.ADMIN, ROLE.STAFF, ROLE.STUDENT)
  @ApiBearerAuth()
  // @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(@Query() pageOptionItemDto: ItemPageOptionDto) {
    return await this.itemService.findAll(pageOptionItemDto);
  }

  @Get('lists')
  @Roles(ROLE.ADMIN, ROLE.STAFF, ROLE.STUDENT)
  @ApiBearerAuth()
  async findWithoutPagintaion() {
    return await this.itemService.findWithoutPagintaion();
  }

  @Get('list/:id')
  @Roles(ROLE.ADMIN, ROLE.STAFF, ROLE.STUDENT)
  @ApiBearerAuth()
  async findOne(@Param('id') id: number) {
    return await this.itemService.findOne(id);
  }

  @Put('update/:id')
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  async update(@Param('id') id: number, @Body() updateItemDto: UpdateItemDto) {
    return await this.itemService.update(id, updateItemDto);
  }

  // @Delete('delete/:id')
  // @Roles(ROLE.ADMIN)
  // @ApiBearerAuth()
  // async remove(@Param('id') id: number) {
  //   return await this.itemService.remove(id);
  // }

  @Patch('changeStatus/:id')
  @ApiBearerAuth()
  @Roles(ROLE.ADMIN)
  changeStatus(@Body() body: ChangeStatusDto, @Param('id') id: number) {
    return this.itemService.changeStatus(body, id);
  }

  @Patch('changeMealType/:id')
  @ApiBearerAuth()
  @Roles(ROLE.ADMIN)
  changeMealType(@Body() body: ChangeMealType, @Param('id') id: number) {
    return this.itemService.changeMealType(body, id);
  }
}
