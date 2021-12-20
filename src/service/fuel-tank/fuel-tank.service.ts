import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FuelTankEntity } from '../entities/fuelTank.entity';
import { FuelType } from '../../domain/fuel/fuel-type';
import { GasStationID } from '../../domain/gas-station/gas-station';
import { AppError } from '../../domain/error/app-error';
import { FuelTank, FuelTankID } from '../../domain/tank/tank';

@Injectable()
export class FuelTankService {
  constructor(
    @InjectRepository(FuelTankEntity)
    private readonly fuelTankRepository: Repository<FuelTankEntity>,
  ) {}

  async getFuelTanksByGasStation(id: GasStationID): Promise<FuelTankEntity[]> {
    const fuelTanks = await this.fuelTankRepository.find({
      where: { gasStationId: `${id}` },
    });

    if (!fuelTanks) {
      throw new AppError('Fuel tanks were not found');
    }

    return fuelTanks;
  }

  async getFuelTank(id: FuelTankID): Promise<FuelTankEntity> {
    const fuelTank = await this.fuelTankRepository.findOne(id);

    if (!fuelTank) {
      throw new AppError('Fuel tank was not found');
    }

    return fuelTank;
  }

  async changeCurrentLevel(
    levelDifference: number,
    fuelTankId: FuelTankID,
  ): Promise<void> {
    const fuelTank = await this.getFuelTank(fuelTankId);

    const newLevel = fuelTank.currentLevel + levelDifference;

    if (newLevel < 0) {
      throw new AppError(
        'Invalid operation. Tank fuel level cannot be less than 0',
      );
    }

    if (newLevel > fuelTank.capacity) {
      throw new AppError(
        'Invalid operation. Tank fuel level cannot be less more than tank capacity',
      );
    }

    await this.fuelTankRepository.save({
      ...fuelTank,
      currentLevel: newLevel,
    });
  }

  async createFuelTank(
    fuelType: FuelType,
    capacity: number,
    currentLevel: number,
    gasStationId: GasStationID,
  ): Promise<void> {
    await this.fuelTankRepository.insert({
      fuelType,
      capacity,
      currentLevel,
      gasStationId,
    });
  }
}
