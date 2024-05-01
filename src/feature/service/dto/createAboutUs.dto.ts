import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ContactUsDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name:string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email:string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message:string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subject:string;

}