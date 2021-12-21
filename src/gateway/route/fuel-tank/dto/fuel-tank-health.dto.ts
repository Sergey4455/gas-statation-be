import { ApiProperty } from '@nestjs/swagger';

export class FuelTankHealthDTO {
  @ApiProperty()
  differencePercent: number;
}
