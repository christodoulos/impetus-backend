import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { FeatureCollection } from 'geojson';

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

@Schema()
export class Nuts {
  @Prop({ type: String, unique: true }) id?: string;
  @Prop({ type: Number }) level?: number;
  @Prop({ type: String, required: true }) scale: string;
  @Prop({ type: Object, required: true }) featureCollection: FeatureCollection;
}

export type NutsDocument = HydratedDocument<Nuts>;
export const NutsSchema = SchemaFactory.createForClass(Nuts);

NutsSchema.pre<NutsDocument>('save', function (next) {
  this.id = `${this.level}:${this.scale}`;
  next();
});
