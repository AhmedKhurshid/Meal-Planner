import { STATUS } from "core/enums";
export declare class CreateMealDto {
    mealPlanId: number[];
    status: STATUS;
    time?: Date;
    userId: number;
}
declare const UpdateMealDto_base: import("@nestjs/common").Type<Partial<CreateMealDto>>;
export declare class UpdateMealDto extends UpdateMealDto_base {
}
export {};
