import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FeatureCollection, FeatureCollectionSchema } from './geojson.schema';
import { GeojsonService } from './geojson.service';
import { GeojsonController } from './geojson.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FeatureCollection.name, schema: FeatureCollectionSchema },
    ]),
  ],
  providers: [GeojsonService],
  controllers: [GeojsonController],
})
export class GeojsonModule {}
