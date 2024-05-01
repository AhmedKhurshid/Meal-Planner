import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { AlphaModel } from './alpha-model';
import { VENDORSTATUS } from 'core/enums';
import { Item } from './item.entity';

// import { User } from "./user.entity";

@Entity()
@Unique('email', ['email'])
export class Vendor extends AlphaModel {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({
    type: 'enum',
    enum: VENDORSTATUS,
    default: VENDORSTATUS.PENDING,
    nullable: true,
  })
  status: string;

  @Column({ nullable: true, length: 225 })
  address: string;
  @Column({ nullable: true, type: 'double' })
  paid: number;

  @Column({ nullable: true, type: 'double' })
  balance: number;

  @Column({ nullable: true, type: 'double' })
  total: number;

  @OneToMany(() => Item, (x) => x.vendorId)
  item?: Item;

  // @OneToOne(() => Order, (x) => x.vendor)
  // @JoinColumn({ foreignKeyConstraintName: 'fk_user_vendor' })
  // user?: User;

  // @Column({nullable: true})
  // vendorId?: number;
}
