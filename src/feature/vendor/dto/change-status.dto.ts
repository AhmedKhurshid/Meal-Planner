import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, Length } from "class-validator";
import { STATUS, VENDORSTATUS } from "core/enums";
import { IsEmail } from "core/validator";
// import { IsEmail } from "src/core/validator";

export class ChangeStatusDto {

  @ApiProperty({ enum: VENDORSTATUS, example: VENDORSTATUS.ACTIVE })
  @IsNotEmpty()
  @IsEnum(VENDORSTATUS, {
      message: 'Status must be (Active, Pending)'
  })
  status?: VENDORSTATUS;
}