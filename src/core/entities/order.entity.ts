import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AlphaModel } from './alpha-model';
import { User } from './user.entity';
import { STATUS } from 'core/enums';
import { MealPlan } from './mealPlan.entity';
import { IsIn } from 'class-validator';

@Entity()
export class Order extends AlphaModel {
  @Column()
  time: string;

  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.PENDING,
    nullable: true,
  })
  status: STATUS;
  
  @Column({ default: 1 }) 
  @IsIn([1, 2])
  quantity: number;

  @ManyToOne(() => User, (x) => x.userOrder)
  @JoinColumn({ foreignKeyConstraintName: 'fk_user_meal' })
  user?: User;

  @Column()
  userId?: number;

  @ManyToOne(() => MealPlan, (x) => x.mealPlan)
  @JoinColumn({ foreignKeyConstraintName: 'fk_mealPlan_order' })
  mealPlan?: number;

  @Column()
  mealPlanId?: number;
}
