import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,
  //  Length 
  } from "class-validator";
import { IsEmail } from "core/validator";
// import { IsEmail } from "src/core/validator";

export class EmailDto {
  @ApiProperty({
    description: 'email for the Token is required in Email format',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string; 
}