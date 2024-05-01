import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  Length,
} from 'class-validator';
import { Match } from 'core/validator';
import { SignInDto } from './sign-in.dto';
import { UserReqFieldDto } from './user-req-field.dto';
// import { CITY } from 'core/enums';

export class SignUpDto extends IntersectionType(SignInDto, UserReqFieldDto) {
  // Status and Role Must be comment out in Production

  @ApiProperty({
    description:
      'password must has special character, alpha numeric and capital / small letters',
  })
  @Length(7, 20, { message: 'Confirm Password must be equal to Password' })
  @Match('password', {
    message: 'Confirm Password does not match with the Password',
  })
  @IsNotEmpty()
  confirmPassword: string;

  // @ApiProperty({
  //   example: CITY.KARACHI
  // })
  // @IsEnum(CITY)
  // // @IsOptional()
  // // @IsNumber()
  // @IsNotEmpty()
  // city: CITY;
}
