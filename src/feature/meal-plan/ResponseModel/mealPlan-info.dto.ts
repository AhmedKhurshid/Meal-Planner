import { ApiProperty } from '@nestjs/swagger';
import { MealPlan } from './mealPlan-detail.dto';

export class MealPlanInfo {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  itemInfo: MealPlan;
}
