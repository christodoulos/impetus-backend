import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeatureCollection, FeatureCollectionDocument } from './geojson.schema';
import { FeatureCollectionDTO } from './geojson.dto';

@Injectable()
export class GeojsonService {
  constructor(
    @InjectModel(FeatureCollection.name)
    private featureCollectionModel: Model<FeatureCollectionDocument>,
  ) {}

  async create(geojson: FeatureCollectionDTO): Promise<FeatureCollection> {
    const newFeatureCollection = new this.featureCollectionModel(geojson);
    return newFeatureCollection.save();
  }
}
