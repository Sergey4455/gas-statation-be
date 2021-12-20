import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GasStationEntity } from '../entities/gas-station.entity';
import { Repository } from 'typeorm';
import { GasStationID } from '../../domain/gas-station/gas-station';
import { AppError } from '../../domain/error/app-error';

@Injectable()
export class GasStationService {
  constructor(
    @InjectRepository(GasStationEntity)
    private readonly gasStationRepository: Repository<GasStationEntity>,
  ) {}

  async getGasStation(id: GasStationID): Promise<GasStationEntity> {
    const gasStation = await this.gasStationRepository
      .createQueryBuilder('g')
      .leftJoinAndSelect('g.tanks', 'tanks')
      .where({ id })
      .getOne();

    if (!gasStation) {
      throw new AppError('Gas station was not found');
    }

    return gasStation;
  }

  async getGasStations(): Promise<GasStationEntity[]> {
    const gasStations = await this.gasStationRepository
      .createQueryBuilder('g')
      .leftJoinAndSelect('g.tanks', 'tanks')
      .getMany();

    if (!gasStations) {
      throw new AppError('Gas stations were not found');
    }

    return gasStations;
  }

  async createGasStation(name: string, city: string): Promise<void> {
    await this.gasStationRepository.insert({ name, city });
  }
}
