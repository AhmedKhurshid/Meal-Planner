import { Column, Entity, OneToMany } from 'typeorm';
import { AlphaModel } from './alpha-model';
import { Item } from './item.entity';
import { Student } from './student.entity';

@Entity()
export class FoodAllergies extends AlphaModel {
  @Column({ length: 300 })
  allergy: string;

  @OneToMany(() => Item, (item) => item.foodAllergyId)
  foodAllergy?: Item[];

  @OneToMany(() => Student, (student) => student.allergiesId)
  studentfoodAllergy?: Student[];
}
