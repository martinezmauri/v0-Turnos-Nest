import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Business } from 'src/business/entities/business.entity';
import { Employee } from 'src/employee/entities/employee.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('service')
export class Service {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column()
  description: string;

  @Column({ type: 'decimal' })
  price: number;

  @ManyToOne(() => Business, (business) => business.services)
  business: Business;

  @ManyToMany(() => Employee, (employee) => employee.services)
  employees: Employee[];

  @OneToMany(() => Appointment, (appointment) => appointment.service)
  appointments: Appointment[];
}
