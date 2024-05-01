import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateServiceDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name:string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image:string;

  @ApiProperty({
    isArray: true,
    type: String,
  })
  @IsNotEmpty()
  type: string[];

  // @ApiProperty({
  //   // type: Number,
  //   example: 'YYYY-MM-DD',
  // })
  // // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // date: Date;

  // @ApiProperty({
  //   // type: Number,
  //   example: 'HH:MM:SS',
  // })
  // // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // time: Date;

}
export class UpdateServiceDto extends PartialType(CreateServiceDto) {}

