import { SignInDto } from './sign-in.dto';
import { UserReqFieldDto } from './user-req-field.dto';
declare const UserSignUpDto_base: import("@nestjs/common").Type<SignInDto & UserReqFieldDto>;
export declare class UserSignUpDto extends UserSignUpDto_base {
    confirmPassword: string;
}
export {};
