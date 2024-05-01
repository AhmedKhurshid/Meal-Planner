import { ApiProperty } from '@nestjs/swagger';
import {
  //  ArrayMinSize, IsEnum,
    IsNotEmpty, IsString } from 'class-validator';
import { SignUpDto } from './sign-up.dto';
// import { DAYS } from 'core/enums';

export class SignUpLawyerDto extends SignUpDto {
  // @ApiProperty()
  // // @IsNumberString()
  // @IsNumber()
  // @IsNotEmpty()
  // specializationId: number;

  @ApiProperty()
  // @IsOptional()
  @IsString()
  @IsNotEmpty()
  license: string;

}
