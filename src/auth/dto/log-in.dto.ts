import { ApiProperty } from '@nestjs/swagger';
import {
  //  IsBoolean,
  IsEmail,
  IsNotEmpty,
  // IsOptional,
  IsString,
} from 'class-validator';

export class LogInDto {
  @ApiProperty({
    description: 'email for the Token is required in Email format',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
