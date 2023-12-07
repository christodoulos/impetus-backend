import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Nuts, NutsSchema } from './nuts.schema';
import { NutsService } from './nuts.service';
import { NutsController } from './nuts.controller';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Nuts.name, schema: NutsSchema }],
      'nuts',
    ),
  ],
  controllers: [NutsController],
  providers: [NutsService],
})
export class NutsModule {}
