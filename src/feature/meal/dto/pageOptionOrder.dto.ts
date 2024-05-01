import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ORDER, STATUS } from 'core/enums';
import { boolean } from 'joi';

export class PageOptionsDtoOrder {
  @ApiPropertyOptional({ enum: ORDER, default: ORDER.ASC })
  @IsEnum(ORDER)
  @IsOptional()
  readonly order?: ORDER = ORDER.ASC;

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
  readonly PageSize?: number = 10;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsString()
  @IsOptional()
  readonly search?: string = '';

  @ApiPropertyOptional()
  @Type(() => String)
  @IsOptional()
  readonly startDate?: string;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsOptional()
  readonly endDate?: string;

  @ApiPropertyOptional()
  @Type(() => boolean)
  @Transform(({ obj, key }) => obj[key] === 'true')
  @IsBoolean()
  @IsOptional()
  readonly enable?: boolean = true;

  // @Type(() => )
  @ApiPropertyOptional()
  // @IsEnum(STATUS)
  @IsString()
  @IsOptional()
  readonly status?: STATUS = STATUS.ACTIVE;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly studentTypeId?: string = '';

  // @ApiPropertyOptional()
  // // @IsEnum(STATUS)
  // @IsString()
  // @IsOptional()
  // readonly gender?: GENDER = GENDER.MALE;

  get skip(): number {
    return (this.pageNo - 1) * this.PageSize;
  }
}

// import { ApiPropertyOptional } from "@nestjs/swagger";
// import { Transform, Type } from "class-transformer";
// import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
// import { ORDER, STATUS } from "core/enums";
// import { boolean } from "joi";

// export class PageOptionsDto {
//   @ApiPropertyOptional({ enum: ORDER, default: ORDER.ASC })
//   @IsEnum(ORDER)
//   @IsOptional()
//   readonly order?: ORDER = ORDER.ASC;

//   @ApiPropertyOptional({
//     minimum: 1,
//     default: 1,
//   })
//   @Type(() => Number)
//   @IsInt()
//   @Min(1)
//   @IsOptional()
//   readonly pageNo?: number = 1;

//   @ApiPropertyOptional({
//     minimum: 1,
//     maximum: 50,
//     default: 10,
//   })
//   @Type(() => Number)
//   @IsInt()
//   @Min(1)
//   @Max(50)
//   @IsOptional()
//   readonly PageSize?: number = 10;

//   @ApiPropertyOptional()
//   @Type(() => String)
//   @IsString()
//   @IsOptional()
//   readonly search?: string = "";

//   @ApiPropertyOptional()
//   @Type(() => boolean)
//   @Transform(({ obj, key }) => obj[key] === 'true')
//   // @IsString()
//   @IsBoolean()
//   @IsOptional()
//   readonly enable?:boolean = true;

//   // @ApiPropertyOptional()
//   // @Type(() => String)
//   // @IsString()
//   // @IsOptional()
//   // readonly email?: string = ' ';

//   // @Type(() => )
//   @ApiPropertyOptional()
//   // @IsEnum(STATUS)
//   @IsString()
//   @IsOptional()
//   readonly status?: STATUS = STATUS.ACTIVE;

//   get skip(): number {
//     return (this.pageNo - 1) * this.PageSize;
//   }
// }
