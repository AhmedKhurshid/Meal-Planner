import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { ServiceForm } from './serviceForm.entity';

@Entity()
export class Service {

  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    select: false
  })
  public createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    select: false
  })
  public updatedAt?: Date;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column({ type: 'simple-array', nullable: true })
  type: string[];

  @OneToMany(() => ServiceForm, (x) => x.service)
  serviceForm?: ServiceForm[];
}
