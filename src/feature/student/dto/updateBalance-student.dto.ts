import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateBalanceStudent{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    balance: number
}