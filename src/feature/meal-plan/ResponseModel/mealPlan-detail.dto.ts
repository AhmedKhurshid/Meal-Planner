import { ApiProperty } from '@nestjs/swagger';
import { VENDORSTATUS } from 'core/enums';

export class MealPlan {
  @ApiProperty({
    description: 'Add Meal Plan First',
  })
  status: VENDORSTATUS;
  @ApiProperty()
  item_id: number;
  @ApiProperty()
  meal_date: Date;
}
