import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { ORDER, VENDORSTATUS } from 'core/enums';
import { boolean, date } from 'joi';

export class ItemPageOptionDto {
  @ApiPropertyOptional({ enum: ORDER, default: ORDER.ASC })
  @IsEnum(ORDER)
  @IsOptional()
  readonly order?: ORDER = ORDER.ASC;

  @ApiPropertyOptional({ enum: VENDORSTATUS, default: VENDORSTATUS.ACTIVE })
  @IsEnum(VENDORSTATUS)
  @IsOptional()
  readonly status?: VENDORSTATUS = VENDORSTATUS.ACTIVE;

  @ApiPropertyOptional({ minimum: 1, default: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsNumber()
  readonly pageNo?: number = 10;

  @ApiPropertyOptional({ minimum: 1, maximum: 50, default: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsNumber()
  readonly pageSize?: number = 10;

  // @ApiPropertyOptional()
  // @Type(() => String)
  // @IsString()
  // @IsOptional()
  // readonly search?: string = '';

  @ApiPropertyOptional()
  @Type(() => date)
  // @IsDateString()
  @IsOptional()
  readonly dateSearch?: string = '';

  @ApiPropertyOptional()
  @Type(() => boolean)
  @IsBoolean()
  @IsOptional()
  @Transform(({ obj, key }) => obj[key] === 'true')
  readonly enable?: boolean = true;

  get skip(): number {
    return (this.pageNo - 1) * this.pageSize;
  }
}
