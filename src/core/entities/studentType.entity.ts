import { Column, Entity, OneToMany } from "typeorm";
import { AlphaModel } from "./alpha-model";
import { Student } from "./student.entity";

@Entity()
export class StudentTpye extends AlphaModel {

  @Column({ type: 'text' })
  name: string;

  @OneToMany(() => Student, (student) => student.typeId)
  type?: Student[];

}