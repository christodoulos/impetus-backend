import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { FeatureCollection } from 'geojson';

@Schema()
export class Nuts {
  @Prop({ type: Number }) level?: number;
  @Prop({ type: String, required: true }) year: string;
  @Prop({ type: String, required: true }) geometryType: string;
  @Prop({ type: String, required: true }) scale: string;
  @Prop({ type: String, required: true }) crs: string;
  @Prop({ type: Object, required: true }) featureCollection: FeatureCollection;
}

export type NutsDocument = HydratedDocument<Nuts>;
export const NutsSchema = SchemaFactory.createForClass(Nuts);
