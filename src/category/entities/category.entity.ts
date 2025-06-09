import { Business } from 'src/business/entities/business.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @OneToMany(() => Business, (business) => business.category)
  businesses: Business[];
}
