import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AlphaModel } from './alpha-model';
import { VENDORSTATUS } from 'core/enums';
import { Item } from './item.entity';
import { Order } from './order.entity';

@Entity()
export class MealPlan extends AlphaModel {
  @Column({
    type: 'enum',
    enum: VENDORSTATUS,
    default: VENDORSTATUS.ACTIVE,
    nullable: true,
  })
  status: VENDORSTATUS;

  @Column({ type: 'date', nullable: true })
  meal_date: Date;

  @ManyToOne(() => Item, (x) => x.item)
  @JoinColumn({ foreignKeyConstraintName: 'fk_mealPlan' })
  item?: Item;

  @Column()
  itemId?: number;

  @OneToMany(() => Order, (order) => order.mealPlanId)
  mealPlan?: Order[];
}
