import { GasStationID } from '../../../../domain/gas-station/gas-station';
import { ApiProperty } from '@nestjs/swagger';
import { FuelTankDTO } from '../../fuel-tank/dto/fuel-tank.dto';

export class GasStationDTO {
  @ApiProperty()
  id: GasStationID;

  @ApiProperty()
  name: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  tanks: FuelTankDTO[];
}
