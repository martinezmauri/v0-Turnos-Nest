import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentMethod } from '../enum/Payment-method.enum';
import { SubscriptionStatus } from '../enum/Subscription-status.enum';
import { User } from 'src/users/entities/user.entity';

@Entity('subscription')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'timestamp' })
  payment_date: Date;

  @Column({ type: 'enum', enum: PaymentMethod })
  payment_method: PaymentMethod;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: SubscriptionStatus })
  status: SubscriptionStatus;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.subscriptions)
  user: User;

  /* Esta en java    @Column({ type: 'date', nullable: true })
  endDate: Date; */
}
