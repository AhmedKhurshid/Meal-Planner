import { GENDER, PAYMENTMETHOD, ROLE, STATUS } from 'core/enums';
import { Column, Entity, OneToMany, OneToOne, Unique } from 'typeorm';
import { AlphaModel } from './alpha-model';
import { Exclude } from 'class-transformer';
import { Student } from './student.entity';
import { Item } from './item.entity';
import { Order } from './order.entity';
import { PaymentRequest } from './paymentRequest.entity';

@Entity()
@Unique('email', ['email'])
export class User extends AlphaModel {
  @Column({ length: 60,nullable: true })
  externalId: string;

  @Column({ length: 60 })
  name: string;

  @Column({ length: 40 })
  email: string;

  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.PENDING,
    nullable: true,
  })
  status: STATUS;

  @Column({
    type: 'enum',
    enum: ROLE,
    nullable: true,
    // default: ROLE.STUDENT,
  })
  role: ROLE;

  @Column({ length: 100, default: '' })
  @Exclude()
  password: string;

  @Column({ length: 500, default: '', nullable: true })
  forgetPasswordToken?: string;

  @Column({ length: 20 })
  phone: string;

  @Column({
    default: GENDER.NONE,
    type: 'enum',
    enum: GENDER,
  })
  gender: GENDER;

  @Column({ type: 'enum', enum: PAYMENTMETHOD, default: PAYMENTMETHOD.NONE })
  paymentMethod: PAYMENTMETHOD;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true, default: 'No Image provided', length: 200 })
  image?: string;

  @Column({ length: 1000, nullable: true })
  @Exclude()
  hashedRt?: string;

  @OneToOne(() => Student, (student) => student.userId)
  students?: Student[];

  // @OneToOne(() => Vendor, vendor => vendor.vendorId)
  // vendor?: Vendor[];

  @OneToMany(() => Item, (item) => item.userId)
  item?: Item[];

  @OneToMany(() => Order, (order) => order.userId)
  userOrder?: Order[];

  @OneToMany(() => PaymentRequest, (payment) => payment.userId)
  userPaymentRequest?: PaymentRequest[];

  // @OneToMany(() => MealPlan, meal => meal.userId)
  // userMeal?: MealPlan[];

  // @Column({
  //   type: 'enum',
  //   enum: CITY,
  //   default: CITY.KARACHI,
  //   nullable: true,
  // })
  // city: CITY;

  // @Column({ nullable: true })
  // location?: string;
}
