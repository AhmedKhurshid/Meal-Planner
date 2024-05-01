import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { GENDER, ROLE, STATUS } from 'core/enums';

export class UserReqFieldDto {
  @ApiProperty({
    description: 'email for the Token is required in Email format',
  })
  @Length(7, 50)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // @ApiP.roperty({
  //   enum: STATUS,
  //   isArray: false,
  //   example: STATUS.PENDING,
  //   default: STATUS.PENDING,
  // })
  @IsOptional()
  @IsEnum(STATUS, {
    message: 'Status must be (Active, Pending, Block, Reject)',
  })
  status: STATUS;

  // @ApiProperty({
  //   enum: ROLE,
  //   isArray: false,
  //   example: ROLE.STUDENT,
  //   default: ROLE.STUDENT,
  // })
  @IsOptional()
  @IsEnum(ROLE, {
    message: 'Role must be (Admin, Student)',
  })
  role: ROLE;

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

  // @ApiProperty({description:
  //   'Location is optional '})
  // @IsOptional()
  // location?:string;
}
