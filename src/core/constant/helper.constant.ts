import { ForbiddenException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { ResponseData } from 'core/common/ResponseModel';
import { User } from 'core/entities';
import { ROLE, STATUS } from 'core/enums';
import { RESPOSE_CODE_MESSAGE } from 'core/enums/respose-code-status';
import { HttpStatus } from '@nestjs/common/enums';
// import { Student } from 'core/entities/student.entity';

export const searalizeUser = (d: any, role: ROLE, status: STATUS) => {
  const user: User = {
    externalId: d.externalId,
    email: d.email,
    name: d.name,
    gender: d.gender,
    phone: d.phone,
    paymentMethod: d.paymentMethod,
    role,
    status,
    password: '',
    // city: d.city,
    image: d.image,
    address: d.address,
    // location:d.location
  };
  return user;
};

// export const searalizeStudent = (d: any) => {
//   const student: Student = {
//     secPhone: d.secPhone,
//     typeId: d.type,
//     allergiesId: d.allergies,
//     userId: d.userId
//   };
//   return student;
// };

export const deSearalizeUser = (d: any) => {
  const result = {
    ...d,
    ...d?.user,
    desc: d?.desc,
  };
  delete result.userId;
  delete result.hashedRt;
  // delete result.createdAt
  // delete result.updatedAt
  delete result.password;
  delete result.user;
  delete result.role;
  return result;
};

export const deSearalizeUsers = (d: any[]) => {
  return d.map((y) => deSearalizeUser(y));
};

const res = new ResponseData();
export const throwForbiddenException = (data) => {
  res.statusCode = HttpStatus.BAD_REQUEST;
  res.message = [RESPOSE_CODE_MESSAGE.EMAILALREADYEXISIT];
  if (data) throw new BadRequestException(res);
};

export const throwForbiddenExceptionUser = (data) => {
  res.statusCode = HttpStatus.BAD_REQUEST;
  res.message = [RESPOSE_CODE_MESSAGE.USERNOTEXISIT];
  if (!data) throw new BadRequestException(res);
};

export const throwForbiddenExceptionTimeScheduleId = (data) => {
  res.statusCode = HttpStatus.BAD_REQUEST;
  res.message = [RESPOSE_CODE_MESSAGE.TIMESCHEDULENOTEXISIT];
  if (!data) throw new BadRequestException(res);
};

export const throwForbiddenExceptionTypeNotFound = (data) => {
  res.statusCode = HttpStatus.BAD_REQUEST;
  res.message = [RESPOSE_CODE_MESSAGE.TYPENOTFOUND];
  if (!data) throw new BadRequestException(res);
};

export const throwForbiddenExceptionFoodAllergies = (data) => {
  res.statusCode = HttpStatus.BAD_REQUEST;
  res.message = [RESPOSE_CODE_MESSAGE.ALLERGYNOTFOUND];
  if (!data) throw new BadRequestException(res);
};

export const throwForbiddenExceptionFileRequried = (data) => {
  res.statusCode = HttpStatus.BAD_REQUEST;
  res.message = [RESPOSE_CODE_MESSAGE.FILEREQURIED];
  if (!data) throw new BadRequestException(res);
};
export const throwForbiddenExceptionName = (data) => {
  res.statusCode = HttpStatus.BAD_REQUEST;
  res.message = [RESPOSE_CODE_MESSAGE.NAMEALREADYEXISIT];
  if (data) throw new BadRequestException(res);
};
export const throwForbiddenMealPlanError = (data) => {
  res.statusCode = HttpStatus.BAD_REQUEST;
  res.message = [RESPOSE_CODE_MESSAGE.MEALPLANALREADYEXIT];
  if (data) throw new BadRequestException(res);
};
export const throwForbiddenExceptionNotFound = (data) => {
  res.statusCode = HttpStatus.BAD_REQUEST;
  res.message = [RESPOSE_CODE_MESSAGE.NOTFOUND];
  if (!data) throw new BadRequestException(res);
};

export const throwForbiddenExceptionServiceName = (data) => {
  res.statusCode = HttpStatus.BAD_REQUEST;
  res.message = [RESPOSE_CODE_MESSAGE.SERVICENAMEALREADYEXISIT];
  if (data) throw new BadRequestException(res);
};

export const throwForbiddenExceptionPasswordNotMatch = () => {
  res.message = [RESPOSE_CODE_MESSAGE.PASSWORDNOTMATCH];
  res.statusCode = HttpStatus.BAD_REQUEST;
  return res;
};
export const throwForbiddenExceptionPreviosDate = (data) => {
  res.message = [RESPOSE_CODE_MESSAGE.PREVIOUSDATE];
  res.statusCode = HttpStatus.BAD_REQUEST;
  if (data) throw new BadRequestException([RESPOSE_CODE_MESSAGE.PREVIOUSDATE]);

  // return res;
};

export const throwForbiddenExceptionDateNotMatch = (date) => {
  res.statusCode = HttpStatus.BAD_REQUEST;
  res.message = [RESPOSE_CODE_MESSAGE.DATEERROR];
  if (date) throw new BadRequestException([RESPOSE_CODE_MESSAGE.DATEERROR]);
};

export const throwForbiddenExceptionAllergyNotFound = (allergy) => {
  res.statusCode = HttpStatus.BAD_REQUEST;
  res.message = [RESPOSE_CODE_MESSAGE.ALLERGYNOTFOUND];
  if (!allergy)
    throw new BadRequestException([RESPOSE_CODE_MESSAGE.ALLERGYNOTFOUND]);
};
export const throwForbiddenExceptionVendorNotFound = (vendor) => {
  res.statusCode = HttpStatus.BAD_REQUEST;
  res.message = [RESPOSE_CODE_MESSAGE.NOVENDOR];
  if (!vendor) throw new BadRequestException([RESPOSE_CODE_MESSAGE.NOVENDOR]);
};
export const throwForbiddenExceptionallergy = (allergy) => {
  res.statusCode = HttpStatus.BAD_REQUEST;
  res.message = [RESPOSE_CODE_MESSAGE.ALLERGYNOTFOUND];
  if (allergy)
    throw new BadRequestException([RESPOSE_CODE_MESSAGE.ALLERGYNOTFOUND]);
};

export const throwForbiddenExceptiontitle = (data) => {
  if (data) throw new ForbiddenException('Title already exsit');
};

export const generatePassword = () => {
  let result = '';
  const characters =
    '!@#~%^&*()_+}{":ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
export const generateCode = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  const res = `MEAL${result}`;
  return res;
};

export const generateLawyerPassword = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXY0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
