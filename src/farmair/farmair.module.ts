import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FarmAIr, FarmAIrSchema } from './farmair.schema';
import { FarmairService } from './farmair.service';
import { FarmairController } from './farmair.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FarmAIr.name, schema: FarmAIrSchema }]),
  ],
  providers: [FarmairService],
  controllers: [FarmairController],
})
export class FarmairModule {}
