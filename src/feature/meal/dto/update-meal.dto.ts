import { PartialType } from '@nestjs/swagger';
import { CreateMealDto } from './create-meal.dto';
// import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
// import { STATUS } from 'core/enums';

// export class UpdateMealDto extends PartialType(CreateMealDto) {
export class UpdateMealDto extends PartialType(CreateMealDto) { }
// @IsOptional()
// @IsNotEmpty()
// @IsArray()
// @ArrayMinSize(1, { message: 'At least one item is required' })
// @ArrayMaxSize(2, { message: 'max item 2 allowed' })
// @IsInt({ each: true, message: 'Each item must be an integer' })
// mealPlanId?: number[];

// @IsOptional()
// @IsEnum(STATUS, {
//     message: 'Status must be (Active, Pending, Block, Reject)',
// })
// status?: STATUS;
// }


