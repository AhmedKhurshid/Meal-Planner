import { AlphaModel } from 'core/entities';
import { Column, Entity, OneToOne } from 'typeorm';
import { Student } from './student.entity';

@Entity()
export class OrderTimeSchedule extends AlphaModel {
  @Column()
  orderTimeIn: string;

  @Column()
  orderTimeOut: string;

  @OneToOne(() => Student, (student) => student.timeScheduleId)
  timeSchedule?: Student[];
}
