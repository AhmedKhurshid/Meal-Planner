import { ApiProperty } from "@nestjs/swagger";
import { LoginUserDetail } from "./userDetail";
import { LoginStudentDetail } from "./studentDetail";
// import { LoginStudentTypeDetail } from "./typeDetail";

export class UserDetailInfo {

  @ApiProperty()
  accessToken:string;

  @ApiProperty()
  refreshToken:string;

  @ApiProperty()
  userDetails : LoginUserDetail;
  
  @ApiProperty()
  studentDetail : LoginStudentDetail;
  
  // @ApiProperty()
  // typeDetail : LoginStudentTypeDetail;
  
}