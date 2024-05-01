import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ITEM, MEAL } from 'core/enums';

export class CreateItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  quantity: string;

  @ApiProperty()
  @IsOptional()
  foodAllergyId?: number;

  @ApiProperty({ enum: ITEM, default: ITEM.ACTIVE })
  @IsEnum(ITEM)
  @IsOptional()
  status?: ITEM;

  @ApiProperty({ enum: ITEM, default: MEAL.LUNCH })
  @IsEnum(MEAL)
  @IsOptional()
  mealType?: MEAL;

  @ApiProperty({ default: 0.0 })
  @IsNumber()
  @IsNotEmpty()
  costPrice: number;

  @ApiProperty({ default: 0.0 })
  // @IsDecimal()
  @IsNumber()
  @IsNotEmpty()
  markupPrice: number;

  @ApiProperty()
  @IsString()
  // @IsNotEmpty()
  @IsOptional()
  image: string;

  userId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  vendorId: number;
}
export class UpdateItemDto extends PartialType(CreateItemDto) {}
