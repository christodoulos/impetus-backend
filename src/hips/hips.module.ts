import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HipsService } from './hips.service';
import { HipsController } from './hips.controller';

@Module({
  imports: [MongooseModule.forFeature([], 'hips')],
  providers: [HipsService],
  controllers: [HipsController],
})
export class HipsModule {}
