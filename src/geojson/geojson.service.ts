import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Feature,
  FeatureDocument,
  FeatureCollection,
  FeatureCollectionDocument,
} from './geojson.schema';
import { FeatureDTO, FeatureCollectionDTO } from './geojson.dto';

@Injectable()
export class GeojsonService {
  constructor(
    @InjectModel(FeatureCollection.name)
    private featureCollectionModel: Model<FeatureCollectionDocument>,
    @InjectModel(Feature.name) private featureModel: Model<FeatureDocument>,
  ) {}

  async createFeature(geojson: FeatureDTO): Promise<Feature> {
    const newFeature = new this.featureModel(geojson);
    return newFeature.save();
  }

  async createFeatures(features: FeatureDTO[]): Promise<Feature[]> {
    return this.featureModel.insertMany(features);
  }

  async findFeatureById(id: string): Promise<Feature> {
    return this.featureModel.findOne({ id }).exec();
  }

  async findNutsById(id: string): Promise<Feature> {
    return this.featureModel
      .findOne({ ['properties.NUTS_ID']: id })
      .select({ _id: 0, __v: 0 })
      .exec();
  }

  // async findNutsByLevel(level: number): Promise<Feature[]> {
  //   return this.featureModel
  //     .find({ ['properties.LEVL_CODE']: level })
  //     .select({ _id: 0, __v: 0 })
  //     .exec();
  // }

  async createFeatureCollection(
    geojson: FeatureCollectionDTO,
  ): Promise<FeatureCollection> {
    // const newFeatureCollection = new this.featureCollectionModel(geojson);
    // return newFeatureCollection.save();
    return this.featureCollectionModel
      .findOneAndUpdate({ id: geojson.id }, geojson, {
        upsert: true,
        new: true,
      })
      .exec();
  }

  async findFeatureCollectionById(id: string): Promise<FeatureCollection> {
    return this.featureCollectionModel.findOne({ id }).exec();
  }
}
