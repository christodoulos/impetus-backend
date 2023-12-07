import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Nuts, NutsDocument } from './nuts.schema';

@Injectable()
export class NutsService {
  constructor(
    @InjectModel(Nuts.name, 'nuts')
    private readonly nutsModel: Model<NutsDocument>,
  ) {}

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
