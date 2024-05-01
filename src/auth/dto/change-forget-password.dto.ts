import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches } from "class-validator";

export class ChangeForgetPasswordDto{

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number; 

  @ApiProperty({
    description:
      'password must has special character, alpha numeric and capital / small letters',
  })
  @IsNotEmpty()
  @Length(7, 20)
  @Matches(/((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
    message:
      'password must has special character, alpha numeric and capital / small letters',
  })  
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  confirmPassword: string;
}