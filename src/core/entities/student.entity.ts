import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { AlphaModel } from './alpha-model';
import { User } from './user.entity';
import { StudentTpye } from './studentType.entity';
import { FoodAllergies } from './foodAllergy.entity';

@Entity()
export class Student extends AlphaModel {
  // @Column({
  //     type: 'enum',
  //     enum: TYPE,
  //     nullable: true,
  //     // default: '',
  // })
  // type: TYPE;

  @Column({ nullable: true, default: '', length: 15 })
  secPhone?: string;

  @Column({ nullable: true, default: 0, type: 'double' })
  balance: number;

  @Column({ nullable: true, default: 0, type: 'double' })
  paid_balance: number;

  @Column({ nullable: true, default: 0, type: 'double' })
  total_balance: number;

  @OneToOne(() => User, (x) => x.students)
  @JoinColumn({ foreignKeyConstraintName: 'fk_user_student' })
  user?: User;

  @Column()
  userId?: number;
  
  @Column()
  timeScheduleId?: number;

  @ManyToOne(() => StudentTpye, (x) => x.type)
  @JoinColumn({ foreignKeyConstraintName: 'fk_Student_type' })
  type?: number;

  @Column()
  typeId?: number;

  @ManyToOne(() => FoodAllergies, (x) => x.studentfoodAllergy)
  @JoinColumn({ foreignKeyConstraintName: 'fk_student_foodallergy' })
  allergies?: number;

  @Column()
  allergiesId?: number;
}
