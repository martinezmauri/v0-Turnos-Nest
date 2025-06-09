import { Business } from 'src/business/entities/business.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'int', nullable: false })
  street_number: number;

  @Column({ type: 'varchar', nullable: false })
  province: string;

  @Column({ type: 'varchar', nullable: false })
  country: string;

  @Column({ type: 'varchar', nullable: false })
  street: string;

  @Column({ type: 'varchar', nullable: false })
  city: string;

  @OneToOne(() => Business, (business) => business.address, { nullable: false })
  business: Business;
}
