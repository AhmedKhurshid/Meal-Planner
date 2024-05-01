import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  //  IsNumber,
  //   IsPhoneNumber,
  IsString,
  // Length
} from 'class-validator';
import { IsEmail } from 'core/validator';

export class OtpVerifyNumberDto {
  // @ApiProperty()
  // @IsNumber()
  // id: number;

  @ApiProperty({
    description: 'email for the Token is required in Email format',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;
}
