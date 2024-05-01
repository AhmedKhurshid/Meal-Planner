import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsThisExsistConstraint implements ValidatorConstraintInterface {
    validate(userName: any, args: ValidationArguments): boolean;
}
export declare function IsUserAlreadyExist(validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
