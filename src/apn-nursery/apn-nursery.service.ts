import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApnPLC, ApnPLCDocument } from './apn-nursery.schema';
import { ApnPLCDTO } from './apn-nursery.dto';

@Injectable()
export class ApnNurseryService {
  constructor(
    @InjectModel(ApnPLC.name) private apnPLCModel: Model<ApnPLCDocument>,
  ) {}

  async getPLCMetrics(limit: number): Promise<ApnPLC[]> {
    const metrics = await this.apnPLCModel
      .find()
      .sort({ ts: -1 })
      .limit(limit)
      .exec();
    return metrics;
  }

  async getTemperatureMembraneTank5(limit: number): Promise<Partial<ApnPLC>[]> {
    const metrics = await this.apnPLCModel
      .find({}, { ts: 1, col3: 1, _id: 0 })
      .sort({ ts: -1 })
      .limit(limit)
      .exec();
    return metrics;
  }

  async getPHMembraneTank5(limit: number): Promise<Partial<ApnPLC>[]> {
    const metrics = await this.apnPLCModel
      .find({}, { ts: 1, col4: 1, _id: 0 })
      .sort({ ts: -1 })
      .limit(limit)
      .exec();
    return metrics;
  }

  async DOAeriationTank4A(limit: number): Promise<Partial<ApnPLC>[]> {
    const metrics = await this.apnPLCModel
      .find({}, { ts: 1, col5: 1, _id: 0 })
      .sort({ ts: -1 })
      .limit(limit)
      .exec();
    return metrics;
  }

  async DOAnoxicTank3(limit: number): Promise<Partial<ApnPLC>[]> {
    const metrics = await this.apnPLCModel
      .find({}, { ts: 1, col6: 1, _id: 0 })
      .sort({ ts: -1 })
      .limit(limit)
      .exec();
    return metrics;
  }

  async MLSSSolidTank5(limit: number): Promise<Partial<ApnPLC>[]> {
    const metrics = await this.apnPLCModel
      .find({}, { ts: 1, col7: 1, _id: 0 })
      .sort({ ts: -1 })
      .limit(limit)
      .exec();
    return metrics;
  }

  async MLSSSolidTank4A(limit: number): Promise<Partial<ApnPLC>[]> {
    const metrics = await this.apnPLCModel
      .find({}, { ts: 1, col8: 1, _id: 0 })
      .sort({ ts: -1 })
      .limit(limit)
      .exec();
    return metrics;
  }

  async LDODOAnoxic(limit: number): Promise<Partial<ApnPLC>[]> {
    const metrics = await this.apnPLCModel
      .find({}, { ts: 1, col9: 1, _id: 0 })
      .sort({ ts: -1 })
      .limit(limit)
      .exec();
    return metrics;
  }

  async TemperatureAnoxic(limit: number): Promise<Partial<ApnPLC>[]> {
    const metrics = await this.apnPLCModel
      .find({}, { ts: 1, col10: 1, _id: 0 })
      .sort({ ts: -1 })
      .limit(limit)
      .exec();
    return metrics;
  }

  async TurbidityTank10(limit: number): Promise<Partial<ApnPLC>[]> {
    const metrics = await this.apnPLCModel
      .find({}, { ts: 1, col11: 1, _id: 0 })
      .sort({ ts: -1 })
      .limit(limit)
      .exec();
    return metrics;
  }

  async LT1(limit: number): Promise<Partial<ApnPLC>[]> {
    const metrics = await this.apnPLCModel
      .find({}, { ts: 1, col12: 1, _id: 0 })
      .sort({ ts: -1 })
      .limit(limit)
      .exec();
    return metrics;
  }

  async LT2(limit: number): Promise<Partial<ApnPLC>[]> {
    const metrics = await this.apnPLCModel
      .find({}, { ts: 1, col13: 1, _id: 0 })
      .sort({ ts: -1 })
      .limit(limit)
      .exec();
    return metrics;
  }

  async LT3(limit: number): Promise<Partial<ApnPLC>[]> {
    const metrics = await this.apnPLCModel
      .find({}, { ts: 1, col14: 1, _id: 0 })
      .sort({ ts: -1 })
      .limit(limit)
      .exec();
    return metrics;
  }
}
