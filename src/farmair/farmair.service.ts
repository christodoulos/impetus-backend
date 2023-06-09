import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FarmAIr, FarmAIrDocument, Scan } from './farmair.schema';
import { Model } from 'mongoose';
import { FarmAIrDTO } from './farmair.dto';

@Injectable()
export class FarmairService {
  constructor(
    @InjectModel(FarmAIr.name) private farmairModel: Model<FarmAIrDocument>,
  ) {}

  async addScan(scan: FarmAIrDTO): Promise<FarmAIr> {
    const existing = await this.farmairModel.findOne({ name: scan.name });
    if (existing) {
      existing.overwrite(scan);
      return existing.save();
    } else {
      const createdScan = new this.farmairModel(scan);
      return createdScan.save();
    }
  }

  async getScan(name: string): Promise<FarmAIr> {
    return this.farmairModel.findOne({ name }).exec();
  }

  async findScanByUuid(uuid: string): Promise<Scan> {
    const document = await this.farmairModel
      .findOne({ 'scans.uuid': uuid })
      .exec();
    return document.scans.find((scan) => scan.uuid === uuid);
  }
}
