import { ApiProperty } from '@nestjs/swagger';
import {
  // ArrayMinSize,
  IsEnum,
  IsNotEmpty,
  // IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { 
  // DAYS,
   GENDER, PAYMENTMETHOD } from 'core/enums';
import { IsEmail } from 'core/validator';

export class AdminLawyerDto {
  @ApiProperty({
    description: 'email for the Token is required in Email formit',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    enum: GENDER,
    isArray: false,
    example: GENDER.MALE,
  })
  @IsEnum(GENDER)
  @IsNotEmpty()
  gender: GENDER;

  @ApiProperty({
    enum: PAYMENTMETHOD,
    default: PAYMENTMETHOD.NONE,
  })
  @IsEnum(PAYMENTMETHOD)
  paymentMethod: PAYMENTMETHOD;

  @ApiProperty()
  @Length(11, 17)
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @ApiProperty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image?: string;

  @ApiProperty({
    description: 'Location is optional ',
  })
  @IsOptional()
  location?: string;

  // @ApiProperty()
  // // @IsNumberString()
  // @IsNumber()
  // @IsNotEmpty()
  // specializationId: number;
}
