import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { MEAL } from 'core/enums';

export class ChangeMealType {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(MEAL, {
    message: 'Should be Breakfast, Lunch, Dinner',
  })
  mealType?: MEAL;
}
