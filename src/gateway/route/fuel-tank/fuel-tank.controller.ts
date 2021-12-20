import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FuelTankService } from '../../../service/fuel-tank/fuel-tank.service';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { FuelTankID } from '../../../domain/tank/tank';
import { FuelTankDTO } from './dto/fuel-tank.dto';
import { AppError } from '../../../domain/error/app-error';
import { fuelTankToDTO } from './fuel-tank.mapper';
import { GasStationID } from '../../../domain/gas-station/gas-station';
import { CreateFuelTankDTO } from './dto/create-fuel-tank.dto';
import { ChangeFuelLevelDTO } from './dto/change-fuel-level.dto';

@Controller('fuel-tank')
export class FuelTankController {
  constructor(private readonly fuelTankService: FuelTankService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get fuel tank by ID' })
  @ApiResponse({ type: FuelTankDTO })
  async getFuelTank(@Param('id') fuelTankId: FuelTankID): Promise<FuelTankDTO> {
    try {
      const fuelTank = await this.fuelTankService.getFuelTank(fuelTankId);
      return fuelTankToDTO(fuelTank);
    } catch (e) {
      if (e instanceof AppError) {
        throw new BadRequestException(e);
      }
      throw new HttpException('Server error', 500);
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get fuel tanks that belong to provided gas station',
  })
  @ApiResponse({ type: [FuelTankDTO] })
  async getFuelTankByGasStation(
    @Query('gasStationId') gasStationId: GasStationID,
  ): Promise<FuelTankDTO[]> {
    try {
      const fuelTanks = await this.fuelTankService.getFuelTanksByGasStation(
        gasStationId,
      );
      return fuelTanks.map(fuelTankToDTO);
    } catch (e) {
      if (e instanceof AppError) {
        throw new BadRequestException(e);
      }
      throw new HttpException('Server error', 500);
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Create fuel tank and assign it to the gas station',
  })
  async createFuelTank(@Body() fuelTank: CreateFuelTankDTO): Promise<void> {
    try {
      await this.fuelTankService.createFuelTank(
        fuelTank.fuelType,
        fuelTank.capacity,
        fuelTank.currentLevel,
        fuelTank.gasStationId as GasStationID,
      );
    } catch (e) {
      throw new BadRequestException();
    }
  }

  @Patch('refill/:id')
  @ApiOperation({ summary: 'Refill fuel tank' })
  async refillFuelTank(
    @Param('id') fuelTankId: FuelTankID,
    @Body() levelChange: ChangeFuelLevelDTO,
  ): Promise<void> {
    try {
      const { levelDifference } = levelChange;
      if (levelDifference <= 0) {
        throw new BadRequestException('Invalid fuel amount');
      }

      await this.fuelTankService.changeCurrentLevel(
        levelDifference,
        fuelTankId,
      );
    } catch (e) {
      if (e instanceof AppError) {
        throw new BadRequestException(e);
      }
      throw e;
    }
  }

  @Patch('release/:id')
  @ApiOperation({ summary: 'Release fuel from tank' })
  async releaseFuelTank(
    @Param('id') fuelTankId: FuelTankID,
    @Body() levelChange: ChangeFuelLevelDTO,
  ): Promise<void> {
    try {
      const { levelDifference } = levelChange;
      if (levelDifference <= 0) {
        throw new BadRequestException('Invalid fuel amount');
      }

      await this.fuelTankService.changeCurrentLevel(
        -levelDifference,
        fuelTankId,
      );
    } catch (e) {
      if (e instanceof AppError) {
        throw new BadRequestException(e);
      }
      throw e;
    }
  }
}
