import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from '../../app.service';
import { GasStationEntity } from '../entities/gas-station.entity';
import { GasStationService } from './gas-station.service';
import { GasStationController } from '../../gateway/route/gas-station/gas-station.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GasStationEntity])],
  exports: [GasStationService],
  controllers: [GasStationController],
  providers: [GasStationService],
})
export class GasStationModule {}
