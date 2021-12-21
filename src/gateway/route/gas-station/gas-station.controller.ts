import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { GasStationService } from '../../../service/gas-station/gas-station.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateGasStationDTO } from './dto/create-gas-station.dto';
import { GasStationDTO } from './dto/gas-station.dto';
import { gasStationToDTO } from './gas-station.mapper';
import { AppError } from '../../../domain/error/app-error';
import { GasStationID } from '../../../domain/gas-station/gas-station';

@Controller('gas-station')
export class GasStationController {
  constructor(private readonly gasStationService: GasStationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all gas stations' })
  @ApiResponse({ type: [GasStationDTO] })
  async getGasStations(): Promise<GasStationDTO[]> {
    try {
      const gasStations = await this.gasStationService.getGasStations();
      return gasStations.map(gasStationToDTO);
    } catch (e) {
      if (e instanceof AppError) {
        throw new BadRequestException(e);
      }
      throw new HttpException('Server error', 500);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gas stations by ID' })
  @ApiResponse({ type: GasStationDTO })
  async getGasStation(@Param('id') id: GasStationID): Promise<GasStationDTO> {
    try {
      const gasStation = await this.gasStationService.getGasStation(id);
      return gasStationToDTO(gasStation);
    } catch (e) {
      if (e instanceof AppError) {
        throw new BadRequestException(e);
      }
      throw new HttpException('Server error', 500);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Add gas station to database' })
  async createGasStation(
    @Body() gasStation: CreateGasStationDTO,
  ): Promise<void> {
    try {
      await this.gasStationService.createGasStation(
        gasStation.name,
        gasStation.city,
      );
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
