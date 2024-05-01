import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AlphaModel } from './alpha-model';
import { PAYMENTREQUEST } from 'core/enums';
import { User } from './user.entity';

@Entity()
export class PaymentRequest extends AlphaModel {
  @Column({ default: 0, type: 'double' })
  amount: number;

  @Column({
    type: 'enum',
    enum: PAYMENTREQUEST,
    default: PAYMENTREQUEST.PENDING,
  })
  status: PAYMENTREQUEST;

  @Column({ nullable: true })
  adminId: number;

  @ManyToOne(() => User, (x) => x.userPaymentRequest)
  @JoinColumn({ foreignKeyConstraintName: 'fk_payment_request' })
  user?: number;

  @Column()
  userId: number;
}
