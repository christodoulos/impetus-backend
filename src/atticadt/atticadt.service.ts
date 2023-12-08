import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Location,
  LocationDocument,
  Nuts,
  NutsDocument,
} from './atticadt.schema';

@Injectable()
export class AtticadtService {
  constructor(
    @InjectModel(Location.name, 'attica_dt')
    private readonly LocationModel: Model<LocationDocument>,
    @InjectModel(Nuts.name, 'attica_dt')
    private readonly nutsModel: Model<NutsDocument>,
  ) {}

  async findLocation(name: string): Promise<Location> {
    const location = await this.LocationModel.findOne({ name })
      .select({ _id: 0, __v: 0 })
      .lean();
    if (!location) {
      throw new HttpException('Failed to find location', HttpStatus.NOT_FOUND);
    }
    return location;
  }

  async findNuts(level: number, scale: string): Promise<Nuts> {
    return await this.nutsModel
      .findOne({ level, scale })
      .select({ _id: 0, __v: 0 })
      .lean();
  }

  async createNuts(data: Nuts): Promise<string> {
    const { scale, featureCollection } = data;
    for (const lvl of [0, 1, 2, 3]) {
      const features = featureCollection.features.filter(
        (feature) => feature.properties.LEVL_CODE === lvl,
      );

      try {
        await this.nutsModel.create({
          level: lvl,
          scale,
          featureCollection: {
            type: 'FeatureCollection',
            features,
          },
        });
      } catch (error) {
        throw new HttpException(
          'Failed to create NUTS',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    return 'All nuts created successfully!';
  }
}
