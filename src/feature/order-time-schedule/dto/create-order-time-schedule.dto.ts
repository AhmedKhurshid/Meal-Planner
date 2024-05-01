import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateOrderTimeScheduleDto {
    @ApiProperty({example: "11:50:30"})
    @IsNotEmpty()
    // @IsString()
    @IsString()
    orderTimeIn:string;

    @ApiProperty({example: "18:30:50"})
    @IsNotEmpty()
    // @IsString()
    @IsString()
    orderTimeOut:string;
}
export class UpdateOrderTimeScheduleDto extends PartialType(CreateOrderTimeScheduleDto) {}

