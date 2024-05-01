import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Service } from "./service.entity";
import { AlphaModel } from "./alpha-model";
// import { CITY } from "core/enums";

@Entity()
export class ServiceForm extends AlphaModel {

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  // @Column({
  //   type: 'enum',
  //   enum: CITY,
  //   default: CITY.KARACHI,
  //   nullable: true,
  // })
  // city: CITY;

  @Column()
  mobile: string;

  @Column()
  email: string;

  @Column()
  type: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  time: Date;

  @ManyToOne(() => Service, (x) => x.serviceForm)
  @JoinColumn({ name: 'serviceId', foreignKeyConstraintName: 'fk_ServiceForm' })
  service?: Service;

  @Column()
  serviceId?: number;

}