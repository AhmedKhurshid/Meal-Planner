import { ApiProperty } from "@nestjs/swagger";

export class DashoardDetail{

  @ApiProperty()
  lawyer:number;

  @ApiProperty()
  cases:number;

  @ApiProperty()
  news:number;

  @ApiProperty()
  book:number;
  
  @ApiProperty()
  appointment:number;
}