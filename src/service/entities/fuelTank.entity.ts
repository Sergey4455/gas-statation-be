import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FuelType } from '../../domain/fuel/fuel-type';
import { GasStationEntity } from './gas-station.entity';

@Entity()
export class FuelTankEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  fuelType: FuelType;

  @Column()
  capacity: number;

  @Column()
  currentLevel: number;

  @ManyToOne(() => GasStationEntity, (gasStation) => gasStation.tanks)
  gasStationId: string;
}
