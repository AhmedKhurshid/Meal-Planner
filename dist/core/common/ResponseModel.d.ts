import { HttpStatus } from "@nestjs/common";
export declare class ResponseData<T> {
    statusCode: HttpStatus;
    message: [string];
    data: T;
    constructor();
}
