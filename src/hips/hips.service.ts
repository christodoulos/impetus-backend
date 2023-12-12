import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { CopernicusSchema } from './copernicus.schema';
import { Connection } from 'mongoose';

@Injectable()
export class HipsService {
  constructor(
    @InjectConnection('hips') private readonly hipsConnection: Connection,
  ) {}

  async getHipsCopernicusByDates(
    collection: string,
    start_date: string,
    end_date: string,
  ) {
    const model = this.hipsConnection.model(
      collection,
      CopernicusSchema,
      collection,
    );
    return await model.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(start_date),
            $lte: new Date(end_date),
          },
        },
      },
      {
        $group: {
          _id: '$nuts_id',
          mean: { $avg: '$mean' },
          min: { $min: '$min' },
          max: { $max: '$max' },
          median: { $avg: '$median' },
        },
      },
    ]);
  }
}
