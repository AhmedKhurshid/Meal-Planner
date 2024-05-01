import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateStudenTtypeDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
}
