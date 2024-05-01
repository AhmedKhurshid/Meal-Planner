import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';



export class PageOptionsDtoInvoice {
//   @ApiPropertyOptional({ enum: ORDER, default: ORDER.ASC })
//   @IsEnum(ORDER)
//   @IsOptional()
//   readonly order?: ORDER = ORDER.ASC;

//   @ApiPropertyOptional({ minimum: 1, default: 1 })
//   @Type(() => Number)
//   @IsInt()
//   @Min(1)
//   @IsNumber()
//   readonly pageNo?: number = 10;

//   @ApiPropertyOptional({ minimum: 1, maximum: 50, default: 10 })
//   @Type(() => Number)
//   @IsInt()
//   @Min(1)
//   @Max(50)
//   @IsNumber()
//   readonly PageSize?: number = 1;

//   @ApiPropertyOptional()
//   @Type(() => String)
//   @IsString()
//   @IsOptional()
//   readonly search?: string = '';

  @ApiPropertyOptional()
  @Type(() => String)
  @IsOptional()
  readonly startDate?: string;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsOptional()
  readonly endDate?: string;

//   @ApiPropertyOptional()
//   @Type(() => boolean)
//   @Transform(({ obj, key }) => obj[key] === 'true')
//   @IsBoolean()
//   @IsOptional()
//   readonly enable?: boolean = true;

//   // @Type(() => )
//   @ApiPropertyOptional()
//   // @IsEnum(STATUS)
//   @IsString()
//   @IsOptional()
//   readonly status?: STATUS = STATUS.ACTIVE;

  // @ApiPropertyOptional()
  // // @IsEnum(STATUS)
  // @IsString()
  // @IsOptional()
  // readonly gender?: GENDER = GENDER.MALE;

//   get skip(): number {
//     return (this.pageNo - 1) * this.PageSize;
//   }
}

