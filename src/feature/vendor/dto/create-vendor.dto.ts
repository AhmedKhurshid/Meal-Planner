import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { VENDORSTATUS } from 'core/enums';

export class CreateVendorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(10, 15)
  phone: string;

  @ApiProperty({
    enum: VENDORSTATUS,
    example: VENDORSTATUS.ACTIVE,
    default: VENDORSTATUS.ACTIVE,
  })
  @IsOptional()
  @IsEnum(VENDORSTATUS, {
    message: 'Status must be (Active, Pending)',
  })
  status?: VENDORSTATUS;

  @ApiProperty()
  @IsString()
  address?: string;

  @ApiProperty({ default: 0.0 })
  @IsNumber()
  @IsOptional()
  paid?: number;

  @ApiProperty({ default: 0.0 })
  @IsNumber()
  @IsOptional()
  balance?: number;

  @ApiProperty({ default: 0.0 })
  @IsNumber()
  @IsOptional()
  total?: number;
}
export class UpdateVendorDto extends PartialType(CreateVendorDto) {}
