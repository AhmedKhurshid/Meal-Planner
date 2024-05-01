import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AdminLawyerDto } from 'admin/dto/adminLawyer.dto';
// import { SignUpDto } from 'auth/dto';
// import { UserSignUpDto } from "auth/dto/user-sign-up.dto copy";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ROLE } from 'core/enums';

export class CreateStudentDto extends AdminLawyerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  externalId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  typeId: number;
  
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  timeScheduleId: number;

  @ApiProperty()
  @Length(11, 17)
  @IsString()
  secPhone: string;

  @ApiProperty({ default: 0 })
  @IsNumber()
  balance: number = 0;

  @ApiProperty({ default: 0 })
  @IsNumber()
  paid_balance: number = 0;

  @ApiProperty({ default: 0 })
  @IsNumber()
  total_balance: number = 0;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  allergiesId: number;

  @ApiProperty({
    enum: ROLE,
    isArray: false,
    example: ROLE.STUDENT,
    default: ROLE.STUDENT,
  })
  @IsNotEmpty()
  @IsEnum(ROLE, {
    message: 'Role must be (Staff, Student)',
  })
  role: ROLE;
}
export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
