import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AtticadtController } from './atticadt.controller';
import { AtticadtService } from './atticadt.service';
import { Location, LocationSchema, Nuts, NutsSchema } from './atticadt.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Location.name, schema: LocationSchema }],
      'attica_dt',
    ),
    MongooseModule.forFeature(
      [{ name: Nuts.name, schema: NutsSchema }],
      'attica_dt',
    ),
  ],
  controllers: [AtticadtController],
  providers: [AtticadtService],
})
export class AtticadtModule {}
