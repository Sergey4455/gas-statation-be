import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChangeFuelLevelDTO {
  @ApiProperty()
  @IsNotEmpty()
  levelDifference: number;
}
