import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'irrigation' })
export class Irrigation {
  @Prop({ type: Number, required: true }) index: number;
  @Prop({ type: Date, required: true }) timestamp: Date;
  @Prop({ type: Number, required: true }) start: number;
  @Prop({ type: Number, required: true }) end: number;
  @Prop({ type: Number, required: true }) conductivity_target: number;
  @Prop({ type: Number, required: true }) ph_target: number;
  @Prop({ type: Number, required: true }) conductivity: number;
  @Prop({ type: Number, required: true }) ph: number;
  @Prop({ type: Number, required: true }) disposal_time: number;
  @Prop({ type: Number, required: true }) valve1_time: number;
  @Prop({ type: Number, required: true }) valve2_time: number;
  @Prop({ type: Number, required: true }) valve3_time: number;
  @Prop({ type: Number, required: true }) valve4_time: number;
  @Prop({ type: Number, required: true }) valve5_time: number;
  @Prop({ type: Number, required: true }) valve6_time: number;
  @Prop({ type: Number, required: true }) valve7_time: number;
  @Prop({ type: Number, required: true }) valve8_time: number;
  @Prop({ type: Number, required: true }) valve9_time: number;
  @Prop({ type: Number, required: true }) valve10_time: number;
  @Prop({ type: Number, required: true }) valve_fertilizer_a: number;
  @Prop({ type: Number, required: true }) valve_fertilizer_b: number;
  @Prop({ type: Number, required: true }) valve_fertilizer_c: number;
  @Prop({ type: Number, required: true }) valve_fertilizer_d: number;
  @Prop({ type: Number, required: true }) valve_fertilizer_e: number;
  @Prop({ type: Number, required: true }) valve_fertilizer_f: number;
  @Prop({ type: Number, required: true }) valve_fertilizer_g: number;
  @Prop({ type: Number, required: true }) valve_fertilizer_h: number;
  @Prop({ type: Number, required: true }) valve_fertilizer_i: number;
  @Prop({ type: Number, required: true }) valve_fertilizer_j: number;
  @Prop({ type: Number, required: true }) valve_fertilizer_acid: number;
  @Prop({ type: Number, required: true }) empty: number;
}

export type IrrigationDocument = HydratedDocument<Irrigation>;
export const IrrigationSchema = SchemaFactory.createForClass(Irrigation);

@Schema({ collection: 'irrigation_data' })
export class IrrigationData {
  @Prop({ type: Date, required: true }) timestamp: Date;
  @Prop({ type: Number, required: true }) temperature_water: number;
  @Prop({ type: Number, required: true }) conductivity_water: number;
  @Prop({ type: Number, required: true }) ph_water: number;
  @Prop({ type: Number, required: true }) temperature_runoff_1: number;
  @Prop({ type: Number, required: true }) conductivity_runoff_1: number;
  @Prop({ type: Number, required: true }) ph_runoff_1: number;
  @Prop({ type: Number, required: true }) temperature_runoff_2: number;
  @Prop({ type: Number, required: true }) conductivity_runoff_2: number;
  @Prop({ type: Number, required: true }) ph_runoff_2: number;
  @Prop({ type: Number, required: true }) sum_runoff_volume_1: number;
  @Prop({ type: Number, required: true }) sum_runoff_volume_2: number;
  @Prop({ type: Number, required: true }) sum_pump_time: number;
  @Prop({ type: Number, required: true }) sum_waterings_volume_1: number;
  @Prop({ type: Number, required: true }) sum_waterings_volume_2: number;
  @Prop({ type: Number, required: true }) empty: number;
}

export type IrrigationDataDocument = HydratedDocument<IrrigationData>;
export const IrrigationDataSchema =
  SchemaFactory.createForClass(IrrigationData);
