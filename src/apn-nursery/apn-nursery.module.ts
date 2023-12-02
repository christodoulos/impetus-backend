import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ApnPLC,
  ApnPLCSchema,
  ApnEydap,
  ApnEydapSchema,
} from './apn-nursery.schema';
import { ApnNurseryService } from './apn-nursery.service';
import { ApnNurseryController } from './apn-nursery.controller';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: ApnPLC.name, schema: ApnPLCSchema }],
      'impetus-dev',
    ),
    MongooseModule.forFeature(
      [{ name: ApnEydap.name, schema: ApnEydapSchema }],
      'impetus-dev',
    ),
    CaslModule,
  ],
  providers: [ApnNurseryService],
  controllers: [ApnNurseryController],
})
export class ApnNurseryModule {}
