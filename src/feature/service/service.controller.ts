import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto, UpdateServiceDto } from './dto/create-service.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public, Roles } from 'core/decorators';
import { ROLE } from 'core/enums';
import { CreateServiceFormDto } from './dto/createServiceForm.dto';
import { ContactUsDto } from './dto/createAboutUs.dto';

@Controller('service')
@ApiTags('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) { }

  @Post()
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  async create(@Body() createServiceDto: CreateServiceDto) {
    return await this.serviceService.create(createServiceDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: number) {
    return this.serviceService.findOne(id);
  }

  @Patch(':id')
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  update(@Param('id') id: number, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(id, updateServiceDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.serviceService.remove(+id);
  // }

  @Post('form')
  @Public()
  async createForm(@Body() body: CreateServiceFormDto) {
    return await this.serviceService.createForm(body);
  }

  @Post('contactUs')
  @Public()
  async createAboutUs(@Body() body: ContactUsDto) {
    return await this.serviceService.createContact(body);
  }
}
