import { FuelTankEntity } from '../../../service/entities/fuelTank.entity';
import { FuelTankDTO } from './dto/fuel-tank.dto';
import { FuelTankID } from '../../../domain/tank/tank';

export function fuelTankToDTO(fuelTank: FuelTankEntity): FuelTankDTO {
  return {
    id: fuelTank.id as FuelTankID,
    fuelType: fuelTank.fuelType,
    capacity: fuelTank.capacity,
    currentLevel: fuelTank.currentLevel,
    gasStationId: fuelTank.gasStationId,
  };
}
