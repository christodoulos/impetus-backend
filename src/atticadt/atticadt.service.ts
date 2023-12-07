import { Injectable } from '@nestjs/common';
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
    return await this.LocationModel.findOne({ name })
      .select({ _id: 0, __v: 0 })
      .lean();
  }

  async createNuts(data: Nuts): Promise<boolean[]> {
    const { year, geometryType, scale, crs, featureCollection } = data;
    const nutsArray: boolean[] = [];
    for (const lvl of [0, 1, 2, 3]) {
      const features = featureCollection.features.filter(
        (feature) => feature.properties.LEVL_CODE === lvl,
      );

      await this.nutsModel.create({
        level: lvl,
        year,
        geometryType,
        scale,
        crs,
        featureCollection: {
          type: 'FeatureCollection',
          features,
        },
      });

      nutsArray.push(true);
    }
    return nutsArray;
  }
}
