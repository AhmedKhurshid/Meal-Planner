import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ROLE, STATUS, UPLOAD_PATH } from 'core/enums';
import { HandleUniqueError } from 'core/error/HandleUniqueError';
import { FileTypeInterceptor } from 'core/interceptor';

import {
  Public,
  GetCurrentUserId,
  GetCurrentUser,
  Roles,
} from '../core/decorators';
import { RtGuard } from '../core/guards';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto';
import { LawyerGetOrInvite } from './dto/lawyer-get&invite.dto';
import { Tokens } from './types';
import { ApiResponseBody } from 'core/common/testing';
import { UserDetailInfo } from './responseModel/userDetailInfo';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileName, FolderName } from 'core/constant/getFileName';
import { ResponseData } from 'core/common/ResponseModel';
import { RESPOSE_CODE_MESSAGE } from 'core/enums/respose-code-status';
import { FlieLocation } from './responseModel/filelocations';
import {
  throwForbiddenExceptionFileRequried,
  throwForbiddenExceptionPasswordNotMatch,
} from 'core/constant';
import { PageOptionsDto } from 'admin/dto/pageOption.dto';
import { EmailDto } from './dto/email.dto';
import { ChangeForgetPasswordDto } from './dto/change-forget-password.dto';
import { OtpVerifyNumberDto } from './dto/otp-verify-number.dto';
import { LogInDto } from './dto/log-in.dto';
import {
  CreateStudentDto,
  // UpdateStudentDto,
} from 'feature/student/dto/create-student.dto';
import { UserChangePasswordDto } from './dto/user-change-password';
import { UpdateBalanceStudent } from 'feature/student/dto/updateBalance-student.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private _ss: AuthService) {}
  // Admin ka kia karna hai
  // @Roles(ROLE.ADMIN)
  // @ApiBearerAuth()
  @Public()
  @Post('admin/signUp')
  // @UseInterceptors(InterceptorImage)
  signUpAdmin(
    @Body() body: SignUpDto,
    // @UploadedFile() image: Express.Multer.File,
  ) {
    body.role = ROLE.ADMIN;
    body.status = STATUS.ACTIVE;

    // if (image?.filename) {
    //   body.image = image.filename;
    //   //  throw new HttpException('admin profile image is required', HttpStatus.FORBIDDEN)
    // }
    try {
      return this._ss.signUpAdmin(body);
    } catch (e) {
      HandleUniqueError(e);
    }
  }

  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  @Post('student/signUp')
  signupLawyer(@Body() body: CreateStudentDto): Promise<Tokens> {
    try {
      return this._ss.signUpLawyer(body);
    } catch (e) {
      HandleUniqueError(e);
    }
  }

  // @Public()
  // @Post('admin/signIn')
  // @ApiResponseBody(AdminDetailInfo)
  // signinLocal(@Body() body: LogInDto) {
  //   return this._ss.signinLocal(body);
  // }

  @Public()
  @ApiResponseBody(UserDetailInfo)
  @Post('student/signIn')
  signin(@Body() body: LogInDto) {
    return this._ss.signin(body);
  }

  @Public()
  @Post('forget/password')
  forgetPassword(@Body() body: EmailDto) {
    return this._ss.forgetPassword(body);
  }

  @Post('forget/code/verify')
  @Public()
  otpverificationforget(@Body() body: OtpVerifyNumberDto) {
    return this._ss.otpverificationforget(body);
  }

  @Public()
  @Post('forget/change/password')
  forgetChangePassword(@Body() body: ChangeForgetPasswordDto) {
    if (body.password != body.confirmPassword) {
      return throwForbiddenExceptionPasswordNotMatch();
    }
    return this._ss.forgetPasswordUpdate(body);
  }

  @Post('change/password')
  @Roles(ROLE.STUDENT)
  @ApiBearerAuth()
  changePassword(
    @GetCurrentUserId() id: string,
    @Body() { password, confirmPassword },
  ) {
    if (password != confirmPassword) {
      return throwForbiddenExceptionPasswordNotMatch();
    }
    return this._ss.changePassword({ id, password });
  }

  @Post('user/change/password')
  @Roles(ROLE.STUDENT)
  @ApiBearerAuth()
  async userChangePassword(
    @GetCurrentUserId() id: number,
    @Body() body: UserChangePasswordDto,
  ) {
    if (
      body.oldPassword === body.password &&
      body.password != body.confirmPassword
    ) {
      return throwForbiddenExceptionPasswordNotMatch();
    }

    const userChangePasswordDto = new UserChangePasswordDto();
    userChangePasswordDto.id = id;
    userChangePasswordDto.oldPassword = body.oldPassword;
    userChangePasswordDto.password = body.password;
    userChangePasswordDto.confirmPassword = body.confirmPassword;

    return this._ss.userChangePassword(userChangePasswordDto);
  }

  @Post('logout')
  logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    return this._ss.logout(userId);
  }

  @UseGuards(RtGuard)
  @Post('refresh')
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this._ss.refreshTokens(userId, refreshToken);
  }

  @Get('student-name-email')
  @Roles(ROLE.STUDENT)
  getLawyer(@Query() body: LawyerGetOrInvite) {
    return this._ss.getLawyerByName(body);
  }

  @Public()
  @Post('upload/:path')
  @ApiResponseBody(FlieLocation)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: FolderName,
        filename: FileName,
      }),
      fileFilter: FileTypeInterceptor,
      limits: {
        fileSize: 1024 * 5120,
        files: 1,
      },
    }),
  )
  async uploadFile(
    @Param('path') path: UPLOAD_PATH,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file?.filename) throwForbiddenExceptionFileRequried(file?.filename);
    const resp = new FlieLocation();
    const res = new ResponseData();
    // file.destination='./public/gift'
    const fileaddress = `public/${path}/${file.filename}`;
    resp.location = fileaddress;
    res.statusCode = HttpStatus.OK;
    res.message = [RESPOSE_CODE_MESSAGE.FILEUPLOADED];
    res.data = resp;
    return res;
  }

  @Get('list/student')
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  // @Public()
  async Lawyer(@Query() pageOptionsDto: PageOptionsDto) {
    return await this._ss.getLawyerList(pageOptionsDto);
  }

  @Get('list/admin')
  @Roles(ROLE.ADMIN)
  @ApiBearerAuth()
  // @Public()
  async Admin(@Query() pageOptionsDto: PageOptionsDto) {
    return await this._ss.getAdminList(pageOptionsDto);
  }

  // @Get('list/lawyer/search')
  // // @Roles(ROLE.ADMIN)
  // @Public()
  // async Lawyersearch() {
  //   return await this._ss.getLawyerList();
  // }

  @Roles(ROLE.STUDENT, ROLE.STAFF)
  @ApiResponseBody(UserDetailInfo)
  @ApiBearerAuth()
  @Get('student/profile')
  profile(@GetCurrentUserId() userId: number) {
    return this._ss.profile(userId);
  }
  @ApiBearerAuth()
  @Roles(ROLE.STUDENT, ROLE.STAFF)
  @Patch('studentBalance')
  updateBalance(
    @GetCurrentUserId() id: number,
    @Body() updateStudentBalance: UpdateBalanceStudent,
  ) {
    return this._ss.updateBalance(id, updateStudentBalance);
  }
  @ApiBearerAuth()
  @Roles(ROLE.ADMIN)
  @Patch('studentReduceBalance/:id')
  updateBalanceMinus(
    @Param('id') id: number,
    @Body() updateStudentBalance: UpdateBalanceStudent,
  ) {
    return this._ss.updateBalanceMinus(id, updateStudentBalance);
  }

  @Roles(ROLE.STUDENT, ROLE.STAFF, ROLE.ADMIN)
  @ApiBearerAuth()
  @Get('LoginUserData')
  getStudentData(@GetCurrentUserId() id: number) {
    return this._ss.getStudentData({ id });
  }
}
