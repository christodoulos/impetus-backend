import {
  IsEnum,
  IsArray,
  ValidateNested,
  IsOptional,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum GeoJsonType {
  FeatureCollection = 'FeatureCollection',
  Feature = 'Feature',
  Point = 'Point',
  LineString = 'LineString',
  Polygon = 'Polygon',
  MultiPolygon = 'MultiPolygon',
}

export class Geometry {
  @IsEnum(GeoJsonType, { message: 'Invalid geometry type' })
  type: GeoJsonType.Point | GeoJsonType.LineString | GeoJsonType.Polygon;

  @IsArray()
  coordinates: any[];
}

export class Feature {
  @IsEnum(GeoJsonType, { message: 'Invalid feature type' })
  type: GeoJsonType.Feature;

  @ValidateNested()
  @Type(() => Geometry)
  geometry: Geometry;

  @IsObject()
  @IsOptional()
  properties: Record<string, any>;
}

export class FeatureCollectionDto {
  @IsEnum(GeoJsonType, { message: 'Invalid feature collection type' })
  type: GeoJsonType.FeatureCollection;

  @ValidateNested({ each: true })
  @Type(() => Feature)
  features: Feature[];

  @IsObject()
  @IsOptional()
  properties: Record<string, any>;
}
