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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { GeojsonService } from './geojson.service';
import { Feature, FeatureCollection } from './geojson.schema';
import { FeatureDTO, FeatureCollectionDTO } from './geojson.dto';
import { Public } from 'src/app.metadata';

@ApiTags('GeoJSON Management')
@Controller('geojson')
export class GeojsonController {
  constructor(private readonly geojsonService: GeojsonService) {}

  @Post('feature')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Registers a new Feature' })
  @ApiBody({ type: FeatureDTO })
  @ApiResponse({
    status: 201,
    description: 'The Feature has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createFeature(@Body() createFeatureDTO: FeatureDTO): Promise<Feature> {
    return await this.geojsonService.createFeature(createFeatureDTO);
  }

  @Post('features')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Registers an array of Features' })
  @ApiBody({ type: [FeatureDTO] })
  @ApiResponse({
    status: 201,
    description: 'The Features have been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createFeatures(
    @Body() createFeatureDTO: FeatureDTO[],
  ): Promise<Feature[]> {
    return await this.geojsonService.createFeatures(createFeatureDTO);
  }

  @Public()
  @Get('feature/:id')
  @ApiOperation({ summary: 'Gets a Feature with a specific id' })
  async getFeature(@Param('id') id: string) {
    const feature = await this.geojsonService.findFeatureById(id);
    return feature;
  }

  @Public()
  @Get('nuts/:id')
  @ApiOperation({ summary: 'Gets a NUTS with a specific id' })
  async getNUTS(@Param('id') id: string) {
    const feature = await this.geojsonService.findNutsById(id);
    return feature;
  }

  @Post('featurecollection')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiBearerAuth('access-token')
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
    return await this.geojsonService.createFeatureCollection(
      createFeatureCollectionDTO,
    );
  }

  @Public()
  @Get('featurecollection/:id')
  @ApiOperation({ summary: 'Gets a Feature Collection with a specific id' })
  async getFeatureCollection(@Param('id') id: string) {
    const featureCollection =
      await this.geojsonService.findFeatureCollectionById(id);
    return featureCollection;
  }
}
