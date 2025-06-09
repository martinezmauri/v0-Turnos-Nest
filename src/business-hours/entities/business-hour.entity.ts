import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DaysOfWeek } from '../enum/DaysOfWeek.enum';
import { Business } from 'src/business/entities/business.entity';

@Entity('business_hour')
export class BusinessHour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: DaysOfWeek })
  day_of_week: DaysOfWeek;

  @Column({ type: 'time' })
  opening_morning_time: string;

  @Column({ type: 'time' })
  closing_morning_time: string;

  @Column({ type: 'time', nullable: true })
  opening_evening_time: string;

  @Column({ type: 'time', nullable: true })
  closing_evening_time: string;

  @ManyToOne(() => Business, (business) => business.businessHours)
  business: Business;
}
