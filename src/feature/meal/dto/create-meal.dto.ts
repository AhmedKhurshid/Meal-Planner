import { ApiProperty, PartialType } from "@nestjs/swagger";

import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { STATUS } from "core/enums";

export class CreateMealDto {

    // @ApiProperty()
    // // @IsArray()
    // // @Type(() => Number)
    // // @IsNumberString({}, { each: true })
    // @IsNumber({},{each: true})
    // // @ArrayMinSize(1, { message: 'At least one item is required' })
    // // @ArrayMaxSize(2, { message: 'max item 2 allowed' })
    // // @IsInt({ each: true, message: 'Each item must be an integer' })
    // @IsNotEmpty()
    // mealPlanId: number[];

    // @ApiProperty({
    //     description: 'An array of mealPlanId numbers',
    //     example: [1, 2],
    //     type: [Number],
    // })
    // @IsArray()
    // @IsNumber({}, { each: true })
    // @IsNotEmpty({ message: 'mealPlanId array should not be empty' })
    // mealPlanId: number[];

    @ApiProperty({
        description: 'An array of mealPlanId numbers',
        example: [1, 2],
        type: [Number],
    })
    @IsNotEmpty({ message: 'mealPlanId array should not be empty' })
    @IsArray()
    @ArrayMinSize(1, { message: 'Exactly one/two dishes are required' })
    @ArrayMaxSize(2, { message: 'Exactly one/two dishes are required' })
    @IsNumber({}, { each: true, message: 'Each element of mealPlanId array should be a number' })
    mealPlanId: number[];



    @ApiProperty({ example: STATUS.ACTIVE })
    @IsOptional()
    @IsEnum(STATUS, {
        message: 'Status must be (Active, Pending, Block, Reject)',
    })
    status: STATUS;

    @ApiProperty({example:'2024-01-02 13:30:30'})
    @IsNotEmpty()
    // @IsOptional()
    @IsString()
    // @IsString()
    time?: string;

    @ApiProperty({example: 1})
    @IsNotEmpty()
    @IsOptional()
    @IsNumber()
    quantity: number;

    userId: number
}


export class UpdateMealDto extends PartialType(CreateMealDto) { }

//     @IsOptional()
//     @IsNotEmpty()
//     @IsNumber()
//     // @IsArray()
//     // @ArrayMinSize(1, { message: 'At least one item is required' })
//     // @ArrayMaxSize(2, { message: 'max item 2 allowed' })
//     // @IsInt({ each: true, message: 'Each item must be an integer' })
//     // mealPlanId?: number[];
//     mealPlanId?: number;

//     @IsOptional()
//     @IsEnum(STATUS, {
//         message: 'Status must be (Active, Pending, Block, Reject)',
//     })
//     status?: STATUS;
// }
