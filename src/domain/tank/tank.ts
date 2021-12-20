import { FuelType } from '../fuel/fuel-type';
import { GasStationID } from '../gas-station/gas-station';

export type FuelTankID = string & { _tag: 'TankID' };

export type FuelTank = {
  id: FuelTankID;
  fuelTank: FuelType;
  capacity: number;
  currentLevel: number;
  gasStationId: GasStationID;
};
