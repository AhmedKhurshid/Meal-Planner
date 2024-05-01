import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { AlphaModel } from './alpha-model';
import { BetaModel } from './beta-model';
@Entity()
export class Notification extends BetaModel{
  


}