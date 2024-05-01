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
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'core/decorators';
import { ROLE } from 'core/enums';
import { PageOptionDto } from './dto/pageOption.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { ApiResponseBody } from 'core/common/testing';
import { NewVendor } from './ResponseModel/vendor-detail.dto';
import { PageOptionsDtoInvoice } from 'feature/invoice/dto/pageOptionInvoice.dto';

@Controller('vendor')
@ApiTags('vendor')
export class VendorController {
  constructor(public vendorService: VendorService) { }

  @Post('create')
  @ApiBearerAuth()
  @ApiResponseBody(NewVendor)
  @Roles(ROLE.ADMIN)
  async create(@Body() createVendorDto: CreateVendorDto) {
    return await this.vendorService.create(createVendorDto);
  }

  @Get('list')
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(ROLE.ADMIN, ROLE.STUDENT)
  async findAll(@Query() pageOption: PageOptionDto) {
    return await this.vendorService.findAll(pageOption);
  }

  @Get('lists')
  // @Public()
  @ApiBearerAuth()
  @Roles(ROLE.ADMIN, ROLE.STUDENT)
  async findAllWithOutPagination() {
    return await this.vendorService.findAllWithOutPagination();
  }

  @Get('list/:id')
  @ApiBearerAuth()
  @Roles(ROLE.ADMIN, ROLE.STUDENT)
  async findOne(@Param('id') id: number) {
    return await this.vendorService.findOne(id);
  }

  @Put('update/:id')
  @ApiBearerAuth()
  @Roles(ROLE.ADMIN)
  async update(
    @Param('id') id: number,
    @Body() updateVendorDto: UpdateVendorDto,
  ) {
    return await this.vendorService.update(id, updateVendorDto);
  }

  // @Delete('delete/:id')
  // @ApiBearerAuth()
  // @Roles(ROLE.ADMIN)
  // async remove(@Param('id') id: number) {
  //   return await this.vendorService.remove(id);
  // }

  @Patch('change/status/:id')
  @Roles(ROLE.ADMIN)
  // @Public()
  @ApiBearerAuth()
  changeLawyerStatus(@Body() body: ChangeStatusDto, @Param('id') id: number) {
    return this.vendorService.changeStatus(body, id);
  }

  @Get('all/vendor')
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  // @Public()
  async findVendor(@Query() pageOptionsDto: PageOptionsDtoInvoice) {
    // const csvData = await this.invoiceService.findVendor(id, pageOptionsDto);
    return this.vendorService.findVendor(pageOptionsDto);

    // Set the appropriate headers for CSV response
  }
}
