import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RolEmployee } from '../enum/RolEmployee.enum';
import { Business } from 'src/business/entities/business.entity';
import { Service } from 'src/service/entities/service.entity';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import { EmployeeHour } from 'src/employee-hours/entities/employee-hour.entity';

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: RolEmployee })
  role: RolEmployee;

  @ManyToOne(() => Business, (business) => business.employees)
  business: Business;

  @ManyToMany(() => Service, (service) => service.employees)
  @JoinTable({
    name: 'employee_service',
    joinColumn: { name: 'employee_id' },
    inverseJoinColumn: { name: 'service_id' },
  })
  services: Service[];

  @OneToMany(() => Appointment, (appointment) => appointment.employee)
  appointments: Appointment[];

  @OneToMany(() => EmployeeHour, (eh) => eh.employee, { cascade: true })
  employeeHours: EmployeeHour[];
}
