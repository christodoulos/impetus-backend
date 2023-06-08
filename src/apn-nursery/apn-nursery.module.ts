import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApnPLC, ApnPLCSchema } from './apn-nursery.schema';
import { ApnNurseryService } from './apn-nursery.service';
import { ApnNurseryController } from './apn-nursery.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ApnPLC.name, schema: ApnPLCSchema }]),
  ],
  providers: [ApnNurseryService],
  controllers: [ApnNurseryController],
})
export class ApnNurseryModule {}
