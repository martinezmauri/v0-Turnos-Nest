import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
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
  /*Guardamos el avatar generado con ui-avatars*/
  @Column({ type: 'varchar', nullable: true })
  avatar_url: string;

  @Column({
    type: 'enum',
    enum: Rol,
    default: Rol.User,
  })
  role: Rol;

  @OneToOne(() => Business, (b) => b.user, { cascade: true })
  business: Business;

  @OneToMany(() => Appointment, (a) => a.user)
  appointments: Appointment[];

  @OneToMany(() => Subscription, (s) => s.user)
  subscriptions: Subscription[];
}
