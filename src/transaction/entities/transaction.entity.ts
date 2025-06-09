import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Business } from 'src/business/entities/business.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column()
  description: string;

  @Column()
  paymentMethod: string;

  @Column()
  status: string;

  @OneToOne(() => Appointment, (appointment) => appointment.transaction)
  @JoinColumn()
  appointment: Appointment;

  @ManyToOne(() => Business, (business) => business.transactions)
  business: Business;
}
