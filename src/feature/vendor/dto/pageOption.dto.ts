import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString, Max, Min, IsInt, IsBoolean } from "class-validator";
import { ORDER } from "core/enums";
import { boolean } from "joi";

export class PageOptionDto {

    @ApiPropertyOptional({ enum: ORDER, default: ORDER.ASC })
    @IsEnum(ORDER)
    @IsOptional()
    readonly order?: ORDER = ORDER.ASC


    @ApiPropertyOptional({ minimum: 1, default: 1 })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsNumber()
    readonly pageNo?: number = 10

    @ApiPropertyOptional({ minimum: 1, maximum: 50, default: 10 })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    @IsNumber()
    readonly pageSize?: number = 1


    @ApiPropertyOptional()
    @Type(() => String)
    @IsString()
    @IsOptional()
    readonly search?: string = "";


    @ApiPropertyOptional()
    @Type(() => boolean)
    @Transform(({ obj, key }) => obj[key] === 'true')
    @IsBoolean()
    @IsOptional()
    readonly enable?: boolean = true


    get skip(): number {
        return (this.pageNo - 1) * this.pageSize;
    }
}