import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GasStationModule } from './service/gas-station/gas-station.module';
import { FuelTankModule } from './service/fuel-tank/fuel-tank.module';
import { config } from '../ormconfig';

@Module({
  imports: [
    GasStationModule,
    FuelTankModule,
    TypeOrmModule.forRoot(config as TypeOrmModuleOptions),
  ],
  providers: [AppService],
})
export class AppModule {}
