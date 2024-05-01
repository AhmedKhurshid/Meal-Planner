import { ApiProperty } from "@nestjs/swagger";
import { AdminDetail } from "./adminDetail";

export class AdminDetailInfo {

  @ApiProperty()
  accessToken : string;

  @ApiProperty()
  refreshToken : string;

  @ApiProperty()
  userDetails : AdminDetail;
  
}