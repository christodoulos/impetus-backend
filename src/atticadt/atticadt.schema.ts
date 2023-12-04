import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
class LngLat {
  @Prop({ type: Number, required: true }) lng: number;
  @Prop({ type: Number, required: true }) lat: number;
}

const LngLatSchema = SchemaFactory.createForClass(LngLat);

@Schema()
export class Location {
  @Prop({ type: String, required: true, unique: true }) name: string;
  @Prop({ type: LngLatSchema, required: true }) center: LngLat;
  @Prop({ type: Number, required: true }) zoom: number;
  @Prop({ type: Number, required: true }) pitch: number;
  @Prop({ type: Number, required: true }) bearing: number;
}

export type LocationDocument = HydratedDocument<Location>;
export const LocationSchema = SchemaFactory.createForClass(Location);
