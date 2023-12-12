import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Copernicus {
  @Prop({ type: Date, required: true, index: true }) date: Date;
  @Prop({ type: String, required: true }) nuts_id: string;
  @Prop({ type: Number, required: true }) mean: number;
  @Prop({ type: Number, required: true }) median: number;
  @Prop({ type: Number, required: true }) min: number;
  @Prop({ type: Number, required: true }) max: number;
}

export type CopernicusDocument = HydratedDocument<Copernicus>;
export const CopernicusSchema = SchemaFactory.createForClass(Copernicus);
