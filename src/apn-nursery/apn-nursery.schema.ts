import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'apn-plc' })
export class ApnPLC {
  @Prop({ type: Date, required: true })
  ts?: Date;

  @Prop({ type: Number, required: true })
  col3?: number;

  @Prop({ type: Number, required: true })
  col4?: number;

  @Prop({ type: Number, required: true })
  col5?: number;

  @Prop({ type: Number, required: true })
  col6?: number;

  @Prop({ type: Number, required: true })
  col7?: number;

  @Prop({ type: Number, required: true })
  col8?: number;

  @Prop({ type: Number, required: true })
  col9?: number;

  @Prop({ type: Number, required: true })
  col10?: number;

  @Prop({ type: Number, required: true })
  col11?: number;

  @Prop({ type: Number, required: true })
  col12?: number;

  @Prop({ type: Number, required: true })
  col13?: number;

  @Prop({ type: Number, required: true })
  col14?: number;
}

export type ApnPLCDocument = HydratedDocument<ApnPLC>;
export const ApnPLCSchema = SchemaFactory.createForClass(ApnPLC);
