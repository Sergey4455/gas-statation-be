import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FuelTankEntity } from './fuelTank.entity';

@Entity()
export class GasStationEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @OneToMany(() => FuelTankEntity, (tanks) => tanks.gasStationId)
  tanks: FuelTankEntity[];
}
