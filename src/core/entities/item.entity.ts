import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AlphaModel } from './alpha-model';
import { User } from './user.entity';
import { MealPlan } from './mealPlan.entity';
import { Vendor } from './vendor.entity';
import { ITEM, MEAL } from 'core/enums';
import { FoodAllergies } from './foodAllergy.entity';
// import { Order } from './order.entity';

@Entity()
export class Item extends AlphaModel {
  @Column({ length: 30 })
  name: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  quantity: string;

  @Column({ nullable: true, type: 'double' })
  costPrice: number;

  @Column({ nullable: true, type: 'double' })
  markupPrice: number;

  @Column({ type: 'enum', enum: ITEM, default: ITEM.ACTIVE })
  status?: ITEM;

  @Column({ type: 'enum', enum: MEAL, default: MEAL.LUNCH })
  mealType?: MEAL;

  @Column({ nullable: true, default: 'No Image Provided', length: 200 })
  image?: string;

  // @ManyToOne(() => User, user => user.item)
  // userId: User;

  @ManyToOne(() => User, (user) => user.item)
  @JoinColumn({ foreignKeyConstraintName: 'fk_user_item' })
  user?: User;

  @Column()
  userId?: number;

  @OneToMany(() => MealPlan, (x) => x.itemId)
  item?: MealPlan;

  @ManyToOne(() => FoodAllergies, (FoodAllergies) => FoodAllergies.foodAllergy)
  @JoinColumn({ foreignKeyConstraintName: 'fk_food_Allergy' })
  foodAllergy?: FoodAllergies;

  @Column()
  foodAllergyId?: number;

  @ManyToOne(() => Vendor, (vendor) => vendor.item)
  @JoinColumn({ foreignKeyConstraintName: 'fk_vendor_item' })
  vendor?: Vendor;

  @Column()
  vendorId?: number;
}
