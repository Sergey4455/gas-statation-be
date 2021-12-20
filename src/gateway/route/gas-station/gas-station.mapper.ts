import { GasStationID } from '../../../domain/gas-station/gas-station';
import { GasStationDTO } from './dto/gas-station.dto';
import { GasStationEntity } from '../../../service/entities/gas-station.entity';
import { fuelTankToDTO } from '../fuel-tank/fuel-tank.mapper';

export function gasStationToDTO(gasStation: GasStationEntity): GasStationDTO {
  return {
    id: gasStation.id as GasStationID,
    name: gasStation.name,
    city: gasStation.city,
    tanks: gasStation.tanks.map(fuelTankToDTO),
  };
}
