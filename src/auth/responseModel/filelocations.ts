import { ApiProperty } from "@nestjs/swagger";

export class FlieLocation {

  @ApiProperty()
  location: string;
}