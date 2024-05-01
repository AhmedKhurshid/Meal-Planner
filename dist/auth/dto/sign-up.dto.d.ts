import { SignInDto } from './sign-in.dto';
import { UserReqFieldDto } from './user-req-field.dto';
declare const SignUpDto_base: import("@nestjs/common").Type<SignInDto & UserReqFieldDto>;
export declare class SignUpDto extends SignUpDto_base {
    confirmPassword: string;
}
export {};
