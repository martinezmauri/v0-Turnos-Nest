import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../enum/Status.enum';
import { Employee } from 'src/employee/entities/employee.entity';
import { Service } from 'src/service/entities/service.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Business } from 'src/business/entities/business.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('appointment')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status;

  @Column({ type: 'timestamp' })
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Employee, (e) => e.appointments)
  employee: Employee;

  @ManyToOne(() => Service, (s) => s.appointments)
  service: Service;

  @OneToOne(() => Transaction, (t) => t.appointment)
  transaction: Transaction;

  @ManyToOne(() => Business, (b) => b.appointments)
  business: Business;

  @ManyToOne(() => User, (u) => u.appointments)
  user: User;
}
