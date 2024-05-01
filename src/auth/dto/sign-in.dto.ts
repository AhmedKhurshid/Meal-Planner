import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Matches } from 'class-validator';
import { IsEmail } from 'core/validator';

export class SignInDto {
  @ApiProperty({
    description: 'email for the Token is required in Email format',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

 
  @ApiProperty({
    description:
      'password must has special character, alpha numeric and capital / small letters',
  })
  @Length(7, 20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
    'password must has special character, alpha numeric and capital / small letters',
  })
  @IsNotEmpty()
  password: string;
}
