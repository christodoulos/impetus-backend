import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AtticaGreenService } from './attica-green.service';
import { AtticaGreenController } from './attica-green.controller';
import {
  Irrigation,
  IrrigationData,
  IrrigationDataSchema,
  IrrigationSchema,
} from './attica-green.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Irrigation.name, schema: IrrigationSchema }],
      'attica_green',
    ),
    MongooseModule.forFeature(
      [{ name: IrrigationData.name, schema: IrrigationDataSchema }],
      'attica_green',
    ),
  ],
  providers: [AtticaGreenService],
  controllers: [AtticaGreenController],
})
export class AtticaGreenModule {}
