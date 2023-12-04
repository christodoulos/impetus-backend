import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Location, LocationDocument } from './atticadt.schema';

@Injectable()
export class AtticadtService {
  constructor(
    @InjectModel(Location.name, 'attica_dt')
    private readonly LocationModel: Model<LocationDocument>,
  ) {}

  async findLocation(name: string): Promise<Location> {
    return await this.LocationModel.findOne({ name })
      .select({ _id: 0, __v: 0 })
      .lean();
  }
}
