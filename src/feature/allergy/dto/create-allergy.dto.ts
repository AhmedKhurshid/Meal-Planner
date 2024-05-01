import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAllergyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  allergy: string;
}
export class UpdateAllergyDto extends PartialType(CreateAllergyDto) {}