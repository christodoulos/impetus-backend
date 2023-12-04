import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AtticadtController } from './atticadt.controller';
import { AtticadtService } from './atticadt.service';
import { Location, LocationSchema } from './atticadt.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Location.name, schema: LocationSchema }],
      'attica_dt',
    ),
  ],
  controllers: [AtticadtController],
  providers: [AtticadtService],
})
export class AtticadtModule {}
