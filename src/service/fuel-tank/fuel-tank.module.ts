import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuelTankEntity } from '../entities/fuelTank.entity';
import { FuelTankService } from './fuel-tank.service';
import { FuelTankController } from '../../gateway/route/fuel-tank/fuel-tank.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FuelTankEntity])],
  exports: [FuelTankService],
  controllers: [FuelTankController],
  providers: [FuelTankService],
})
export class FuelTankModule {}
