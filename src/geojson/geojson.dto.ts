import {
  IsEnum,
  IsArray,
  ValidateNested,
  IsOptional,
  IsObject,
  Equals,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum GeometryType {
  Point = 'Point',
  LineString = 'LineString',
  Polygon = 'Polygon',
  MultiPolygon = 'MultiPolygon',
}

@ValidatorConstraint({ name: 'validCoordinates', async: false })
export class IsCoordinates implements ValidatorConstraintInterface {
  validate(coordinates: any[], args: ValidationArguments): boolean {
    const type: GeometryType = (args.object as Geometry).type;
    // console.log(type);

    switch (type) {
      case GeometryType.Point:
        return this.validatePoint(coordinates);
      case GeometryType.LineString:
        return this.validateLineString(coordinates);
      case GeometryType.Polygon:
        return this.validatePolygon(coordinates);
      case GeometryType.MultiPolygon:
        return this.validateMultipolygon(coordinates);
      default:
        return false;
    }
  }

  private validatePoint = (coordinates: any[]): boolean => {
    return coordinates.length === 2 && coordinates.every(Number.isFinite);
  };

  private validateLineString = (coordinates: any[]): boolean => {
    return coordinates.length >= 2 && coordinates.every(this.validatePoint);
  };

  private validatePolygon = (coordinates: any[]): boolean => {
    return (
      coordinates.length >= 1 && coordinates.every(this.validateLineString)
    );
  };

  private validateMultipolygon = (coordinates: any[]): boolean => {
    return coordinates.length >= 2 && coordinates.every(this.validatePolygon);
  };

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be a valid coordinates for type ${
      (args.object as Geometry).type
    }`;
  }
}

export class Geometry {
  @IsEnum(GeometryType, { message: 'Invalid geometry type' })
  type:
    | GeometryType.Point
    | GeometryType.LineString
    | GeometryType.Polygon
    | GeometryType.MultiPolygon;

  @IsArray()
  @Validate(IsCoordinates, { message: 'Invalid coordinates' })
  coordinates: any[];
}

export class FeatureDTO {
  @Equals('Feature', { message: 'Invalid feature type' })
  type: 'Feature';

  @ValidateNested()
  @Type(() => Geometry)
  geometry: Geometry;

  @IsString()
  @IsOptional()
  id: string;

  @IsObject()
  @IsOptional()
  properties: Record<string, any>;
}

export class FeatureCollectionDTO {
  @Equals('FeatureCollection', { message: 'Invalid feature collection type' })
  @ApiProperty({
    example: 'FeatureCollection',
    description: "The string 'FeatureCollection'",
  })
  type: 'FeatureCollection';

  @ValidateNested({ each: true })
  @Type(() => FeatureDTO)
  @ApiProperty({
    example: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          coordinates: [23.64550462508811, 38.05711568565323],
          type: 'Point',
        },
      },
      {
        type: 'Feature',
        properties: {},
        geometry: {
          coordinates: [
            [23.419718494548874, 37.85874639861704],
            [24.051919660058758, 37.8638394814854],
          ],
          type: 'LineString',
        },
      },
      {
        type: 'Feature',
        properties: {},
        geometry: {
          coordinates: [
            [
              [23.545513624418675, 37.654734663030325],
              [23.545513624418675, 37.38867927290089],
              [23.929350046335372, 37.38867927290089],
              [23.929350046335372, 37.654734663030325],
              [23.545513624418675, 37.654734663030325],
            ],
          ],
          type: 'Polygon',
        },
      },
    ],
    description: 'An array of Features',
  })
  features: FeatureDTO[];

  @IsString()
  @IsOptional()
  id: string;

  @IsObject()
  @IsOptional()
  @ApiProperty({ description: 'Various GeoJSON Properties' })
  properties: Record<string, any>;
}
