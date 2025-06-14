import { Address } from 'src/address/entities/address.entity';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import { BusinessHour } from 'src/business-hours/entities/business-hour.entity';
import { Category } from 'src/category/entities/category.entity';
import { Employee } from 'src/employee/entities/employee.entity';
import { Service } from 'src/service/entities/service.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('business')
export class Business {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  phone_number: string;

  @Column({ type: 'varchar', nullable: false })
  logo: string;

  @OneToOne(() => Address, (address) => address.business, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  address: Address;

  /* onetoone joincolum */
  @ManyToOne(() => User, (user) => user.businesses)
  user: User;

  @ManyToOne(() => Category, (category) => category.businesses)
  category: Category;

  @OneToMany(() => BusinessHour, (bh) => bh.business, { cascade: true })
  businessHours: BusinessHour[];

  @OneToMany(() => Employee, (e) => e.business, { cascade: true })
  employees: Employee[];

  @OneToMany(() => Service, (s) => s.business)
  services: Service[];

  @OneToMany(() => Appointment, (a) => a.business)
  appointments: Appointment[];

  @OneToMany(() => Transaction, (t) => t.business)
  transactions: Transaction[];
}
