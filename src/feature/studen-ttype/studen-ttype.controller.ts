import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { StudenTtypeService } from './studen-ttype.service';
import { CreateStudenTtypeDto } from './dto/create-studen-ttype.dto';
import { UpdateStudenTtypeDto } from './dto/update-studen-ttype.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Roles } from 'core/decorators';
import { ROLE } from 'core/enums';
import { PageOptionsDto } from 'admin/dto/pageOption.dto';

@Controller('student-type')
@ApiTags('studentType')
export class StudenTtypeController {
  constructor(private readonly studenTtypeService: StudenTtypeService) {}

  @Post('create')
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  create(@Body() createStudenTtypeDto: CreateStudenTtypeDto) {
    return this.studenTtypeService.create(createStudenTtypeDto);
  }

  @Get()
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.studenTtypeService.getNotificationList(pageOptionsDto);
  }

  @Get(':id')
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  findOne(@Param('id') id: number) {
    return this.studenTtypeService.findOne(id);
  }

  @Put(':id')
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  update(@Param('id') id: number, @Body() updateStudenTtypeDto: UpdateStudenTtypeDto) {
    return this.studenTtypeService.update(id, updateStudenTtypeDto);
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  remove(@Param('id') id: number) {
    return this.studenTtypeService.remove(id);
  }
}
