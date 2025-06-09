import { DaysOfWeek } from 'src/business-hours/enum/DaysOfWeek.enum';
import { Employee } from 'src/employee/entities/employee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('employee_hour')
export class EmployeeHour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: DaysOfWeek })
  day_of_week: DaysOfWeek;

  @Column({ type: 'time' })
  opening_morning_time: string;

  @Column({ type: 'time' })
  closing_morning_time: string;

  @Column({ type: 'time', nullable: true })
  opening_evening_time?: string | null;

  @Column({ type: 'time', nullable: true })
  closing_evening_time?: string | null;

  @ManyToOne(() => Employee, (employee) => employee.employeeHours, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
