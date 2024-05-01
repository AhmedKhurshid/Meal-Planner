import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ITEM } from 'core/enums';

export class ChangeStatusDto {
  @ApiProperty({ enum: ITEM, example: ITEM.ACTIVE })
  @IsNotEmpty()
  @IsEnum(ITEM, {
    message: 'Status must be (Active, Inactive)',
  })
  status?: ITEM;
}
