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
import { AllergyService } from './allergy.service';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { UpdateAllergyDto } from './dto/update-allergy.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'core/decorators';
import { ROLE } from 'core/enums';
import { AllergyPageOptionDto } from './dto/allergyPageOption.dto';

@Controller('allergy')
@ApiTags('allergy')
export class AllergyController {
  constructor(private readonly allergyService: AllergyService) {}

  @Post('create')
  @ApiBearerAuth()
  @Roles(ROLE.ADMIN)
  async create(@Body() createAllergyDto: CreateAllergyDto) {
    return await this.allergyService.create(createAllergyDto);
  }

  @Get('list')
  @Roles(ROLE.ADMIN, ROLE.STAFF, ROLE.STUDENT)
  @ApiBearerAuth()
  async findAll(@Query() allergyPageOption: AllergyPageOptionDto) {
    return await this.allergyService.findAll(allergyPageOption);
  }

  @Get('listWithoutPagination')
  @Roles(ROLE.ADMIN, ROLE.STAFF, ROLE.STUDENT)
  @ApiBearerAuth()
  async findAllwithoutPagination() {
    return await this.allergyService.findAllwithoutPagination();
  }

  @Get('list/:id')
  @Roles(ROLE.ADMIN, ROLE.STAFF, ROLE.STUDENT)
  @ApiBearerAuth()
  async findOne(@Param('id') id: number) {
    return await this.allergyService.findOne(id);
  }

  @Patch('update/:id')
  @ApiBearerAuth()
  @Roles(ROLE.ADMIN)
  update(@Param('id') id: number, @Body() updateAllergyDto: UpdateAllergyDto) {
    return this.allergyService.update(id, updateAllergyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.allergyService.remove(+id);
  }

}
