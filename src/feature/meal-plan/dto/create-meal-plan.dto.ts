import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  // Matches,
} from 'class-validator';
import { VENDORSTATUS } from 'core/enums';

export class CreateMealPlanDto {
  @ApiProperty({ enum: VENDORSTATUS, default: VENDORSTATUS.ACTIVE })
  @IsOptional()
  @IsEnum(VENDORSTATUS, { message: 'Status must be Active or Pending' })
  status?: VENDORSTATUS;

  @ApiProperty({ default: 1 })
  @IsNumber()
  @IsNotEmpty()
  item_id: number;

  @ApiProperty({example: "2024-10-02"})
  @IsNotEmpty()
  @IsDateString()
  meal_date: Date;
}
