import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Rol } from '../enum/Rol.enum';
import { Business } from 'src/business/entities/business.entity';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { Exclude } from 'class-transformer';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'varchar', nullable: false })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: Rol,
    default: Rol.User,
  })
  role: Rol;

  @OneToMany(() => Business, (b) => b.user, { cascade: true })
  businesses: Business[];

  @OneToMany(() => Appointment, (a) => a.user)
  appointments: Appointment[];

  @OneToMany(() => Subscription, (s) => s.user)
  subscriptions: Subscription[];
}
