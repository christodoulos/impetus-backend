import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { GeometryType } from './geojson.dto';

@Schema()
class Geometry {
  @Prop({ type: String, required: true, enum: Object.values(GeometryType) })
  type: GeometryType;

  @Prop({ type: [], required: true })
  coordinates: any[];
}

const GeometrySchema = SchemaFactory.createForClass(Geometry);

@Schema()
class Feature {
  @Prop({ type: String, required: true, default: 'Feature' })
  type: 'Feature';

  @Prop({ type: GeometrySchema, required: true })
  geometry: Geometry;

  @Prop({ type: Object, default: {} })
  properties: Record<string, any>;
}

const FeatureSchema = SchemaFactory.createForClass(Feature);

@Schema()
export class FeatureCollection {
  @Prop({
    type: String,
    required: true,
    default: 'FeatureCollection',
  })
  type: 'FeatureCollection';

  @Prop({ type: [FeatureSchema], required: true })
  features: Feature[];

  @Prop({ type: Object, default: {} })
  properties: Record<string, any>;
}

export type FeatureCollectionDocument = HydratedDocument<FeatureCollection>;
export const FeatureCollectionSchema =
  SchemaFactory.createForClass(FeatureCollection);
