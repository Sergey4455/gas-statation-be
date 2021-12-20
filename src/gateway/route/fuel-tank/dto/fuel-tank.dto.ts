import { ApiProperty } from '@nestjs/swagger';
import { FuelTankID } from '../../../../domain/tank/tank';
import { FuelType } from '../../../../domain/fuel/fuel-type';

export class FuelTankDTO {
  @ApiProperty()
  id: FuelTankID;

  @ApiProperty()
  fuelType: FuelType;

  @ApiProperty()
  capacity: number;

  @ApiProperty()
  currentLevel: number;

  @ApiProperty()
  gasStationId: string;
}
