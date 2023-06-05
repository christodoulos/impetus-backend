import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { GeojsonService } from './geojson.service';
import { FeatureCollection } from './geojson.schema';
import { FeatureCollectionDTO } from './geojson.dto';

@ApiTags('GeoJSON Management')
@Controller('geojson')
export class GeojsonController {
  constructor(private readonly geojsonService: GeojsonService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Registers a new Feature Collection' })
  @ApiBody({ type: FeatureCollectionDTO })
  @ApiResponse({
    status: 201,
    description: 'The Feature Collection has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createFeatureCollection(
    @Body() createFeatureCollectionDTO: FeatureCollectionDTO,
  ): Promise<FeatureCollection> {
    return await this.geojsonService.create(createFeatureCollectionDTO);
  }
}
