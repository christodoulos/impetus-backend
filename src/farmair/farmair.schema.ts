import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  FeatureCollection,
  FeatureCollectionSchema,
} from 'src/geojson/geojson.schema';

// Soil Data

@Schema({ _id: false })
export class SoilData {
  @Prop({ required: true })
  dt: number;

  @Prop({ required: true })
  t10: number;

  @Prop({ required: true })
  moisture: number;

  @Prop({ required: true })
  t0: number;
}

const SoilDataSchema = SchemaFactory.createForClass(SoilData);

// Weather Data

@Schema({ _id: false })
class Weather {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  main: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  icon: string;
}

const WeatherSchema = SchemaFactory.createForClass(Weather);

@Schema({ _id: false })
class Main {
  @Prop({ required: true })
  temp: number;

  @Prop({ required: true })
  feels_like: number;

  @Prop({ required: true })
  pressure: number;

  @Prop({ required: true })
  humidity: number;

  @Prop({ required: true })
  temp_min: number;

  @Prop({ required: true })
  temp_max: number;
}

const MainSchema = SchemaFactory.createForClass(Main);

@Schema({ _id: false })
class Wind {
  @Prop({ required: true })
  speed: number;

  @Prop({ required: true })
  deg: number;

  @Prop({ required: true })
  gust: number;
}

const WindSchema = SchemaFactory.createForClass(Wind);

@Schema({ _id: false })
class Clouds {
  @Prop({ required: true })
  all: number;
}

const CloudsSchema = SchemaFactory.createForClass(Clouds);

@Schema({ _id: false })
class WeatherData {
  @Prop({ required: true })
  dt: number;

  @Prop({ type: [WeatherSchema], required: true })
  weather: Weather[];

  @Prop({ type: MainSchema, required: true })
  main: Main;

  @Prop({ type: WindSchema, required: true })
  wind: Wind;

  @Prop({ type: CloudsSchema, required: true })
  clouds: Clouds;
}

const WeatherDataSchema = SchemaFactory.createForClass(WeatherData);

// Satellite Data

@Schema({ _id: false })
class Sun {
  @Prop({ required: true })
  elevation: number;

  @Prop({ required: true })
  azimuth: number;
}

const SunSchema = SchemaFactory.createForClass(Sun);

@Schema({ _id: false })
class CommonSatellite {
  @Prop({ required: true })
  truecolor: string;

  @Prop({ required: true })
  falsecolor: string;

  @Prop({ required: true })
  ndvi: string;

  @Prop({ required: true })
  evi: string;

  @Prop({ required: true })
  evi2: string;

  @Prop({ required: true })
  nri: string;

  @Prop({ required: true })
  dswi: string;

  @Prop({ required: true })
  ndwi: string;
}

// const CommonSatelliteSchema = SchemaFactory.createForClass(CommonSatellite);

@Schema({ _id: false })
class Image extends CommonSatellite {}

const ImageSchema = SchemaFactory.createForClass(Image);

@Schema({ _id: false })
class Tile extends CommonSatellite {}

const TileSchema = SchemaFactory.createForClass(Tile);

@Schema({ _id: false })
class Data extends CommonSatellite {}

const DataSchema = SchemaFactory.createForClass(Data);

@Schema({ _id: false })
class SatelliteData {
  @Prop({ type: Number, required: true })
  dt: number;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: Number, required: true })
  dc: number;

  @Prop({ type: Number, required: true })
  cl: number;

  @Prop({ type: SunSchema, required: true })
  sun: Sun;

  @Prop({ type: ImageSchema, required: true })
  image: Image;

  @Prop({ type: TileSchema, required: true })
  tile: Tile;

  @Prop({ type: DataSchema, required: true })
  data: Data;
}

const SatelliteDataSchema = SchemaFactory.createForClass(SatelliteData);

// Satellite Stats

@Schema({ _id: false })
class StatsBase {
  @Prop({ required: true })
  std: number;

  @Prop({ required: true })
  p25: number;

  @Prop({ required: true })
  num: number;

  @Prop({ required: true })
  min: number;

  @Prop({ required: true })
  max: number;

  @Prop({ required: true })
  median: number;

  @Prop({ required: true })
  p75: number;

  @Prop({ required: true })
  mean: number;

  @Prop({ required: true })
  dt: number;
}

const StatsBaseSchema = SchemaFactory.createForClass(StatsBase);

@Schema({ _id: false })
class SatelliteStats {
  @Prop({ type: [StatsBaseSchema], required: true })
  ndvi: StatsBase[];

  @Prop({ type: [StatsBaseSchema], required: true })
  evi: StatsBase[];

  @Prop({ type: [StatsBaseSchema], required: true })
  evi2: StatsBase[];

  @Prop({ type: [StatsBaseSchema], required: true })
  nri: StatsBase[];

  @Prop({ type: [StatsBaseSchema], required: true })
  dswi: StatsBase[];

  @Prop({ type: [StatsBaseSchema], required: true })
  ndwi: StatsBase[];
}

const SatelliteStatsSchema = SchemaFactory.createForClass(SatelliteStats);

@Schema({ _id: false })
export class Scan {
  @Prop({ type: String, required: true })
  uuid: string;

  @Prop({ type: [SoilDataSchema], required: true })
  soil_data: SoilData[];

  @Prop({ type: [WeatherDataSchema], required: true })
  weather_data: WeatherData[];

  @Prop({ type: [SatelliteDataSchema], required: true })
  satellite_data: SatelliteData[];

  @Prop({ type: [SatelliteStatsSchema], required: true })
  satellite_stats: SatelliteStats[];
}

const ScanSchema = SchemaFactory.createForClass(Scan);

@Schema({ collection: 'farmair' })
export class FarmAIr {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [String], required: true })
  layers: string[];

  @Prop({ type: FeatureCollectionSchema, required: true })
  geojson: FeatureCollection;

  @Prop({ type: [ScanSchema], required: true })
  scans: Scan[];
}

export type FarmAIrDocument = HydratedDocument<FarmAIr>;
export const FarmAIrSchema = SchemaFactory.createForClass(FarmAIr);
