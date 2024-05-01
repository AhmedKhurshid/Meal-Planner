import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, Length, IsNumber } from "class-validator";
// import { CITY } from "core/enums";
import { IsEmail } from "core/validator";

export class CreateServiceFormDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName:string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName:string;

  @ApiProperty({
    description: 'email for the Token is required in Email formit',
  })
  @Length(7, 50)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @Length(11, 17)
  @IsString()
  @IsNotEmpty()
  mobile: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type:string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description:string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  serviceId:number;

  @ApiProperty({
    // type: Number,
    example: 'YYYY-MM-DD',
  })
  // @IsOptional()
  @IsString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    // type: Number,
    example: 'HH:MM:SS',
  })
  // @IsOptional()
  @IsString()
  @IsNotEmpty()
  time: Date;
}