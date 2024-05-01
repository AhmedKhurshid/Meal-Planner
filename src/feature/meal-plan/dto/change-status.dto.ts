import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import {  VENDORSTATUS } from 'core/enums';

export class ChangeStatusDto {
  // @ApiProperty({ enum: ITEM, example: ITEM.ACTIVE })
  // @IsNotEmpty()
  // @IsEnum(ITEM, {
  //   message: 'Status must be (Active, Inactive)',
  // })
  // status?: ITEM;
  @ApiProperty({ enum: VENDORSTATUS, default: VENDORSTATUS.ACTIVE })
  @IsNotEmpty()
  @IsEnum(VENDORSTATUS, { message: 'Status must be Active or Pending' })
  status?: VENDORSTATUS;
}
