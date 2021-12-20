import { ApiProperty } from '@nestjs/swagger';
import { FuelType } from '../../../../domain/fuel/fuel-type';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateFuelTankDTO {
  @ApiProperty({ enum: FuelType })
  @IsEnum(FuelType)
  fuelType: FuelType;

  @ApiProperty()
  @IsNotEmpty()
  capacity: number;

  @ApiProperty()
  @IsNotEmpty()
  currentLevel: number;

  @ApiProperty()
  @IsNotEmpty()
  gasStationId: string;
}
