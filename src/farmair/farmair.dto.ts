import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { FeatureCollectionDTO as FeatureCollectionDto } from 'src/geojson/geojson.dto';

// Soil Data DTO definitions start here

class SoilDataDto {
  @IsNotEmpty()
  dt: number;

  @IsNotEmpty()
  t10: number;

  @IsNotEmpty()
  moisture: number;

  @IsNotEmpty()
  t0: number;
}

class SoilDataCollectionDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SoilDataDto)
  soil_data: SoilDataDto[];
}

// Weather Data DTO definitions start here

class WeatherDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  main: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  icon: string;
}

class MainDto {
  @IsNotEmpty()
  temp: number;

  @IsNotEmpty()
  feels_like: number;

  @IsNotEmpty()
  pressure: number;

  @IsNotEmpty()
  humidity: number;

  @IsNotEmpty()
  temp_min: number;

  @IsNotEmpty()
  temp_max: number;
}

class WindDto {
  @IsNotEmpty()
  speed: number;

  @IsNotEmpty()
  deg: number;

  @IsNotEmpty()
  gust: number;
}

class CloudsDto {
  @IsNotEmpty()
  all: number;
}

export class WeatherDataDto {
  @IsNotEmpty()
  dt: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WeatherDto)
  weather: WeatherDto[];

  @ValidateNested()
  @Type(() => MainDto)
  main: MainDto;

  @ValidateNested()
  @Type(() => WindDto)
  wind: WindDto;

  @ValidateNested()
  @Type(() => CloudsDto)
  clouds: CloudsDto;
}

// SatelliteData DTO

class SunDto {
  @IsNotEmpty()
  elevation: number;

  @IsNotEmpty()
  azimuth: number;
}

class CommonSatelliteDto {
  @IsNotEmpty()
  truecolor: string;

  @IsNotEmpty()
  falsecolor: string;

  @IsNotEmpty()
  ndvi: string;

  @IsNotEmpty()
  evi: string;

  @IsNotEmpty()
  evi2: string;

  @IsNotEmpty()
  nri: string;

  @IsNotEmpty()
  dswi: string;

  @IsNotEmpty()
  ndwi: string;
}

class ImageDto extends CommonSatelliteDto {}

class TileDto extends CommonSatelliteDto {}

class DataDto extends CommonSatelliteDto {}

export class SatelliteDataDto {
  @IsNotEmpty()
  dt: number;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  dc: number;

  @IsNotEmpty()
  cl: number;

  @ValidateNested()
  @Type(() => SunDto)
  sun: SunDto;

  @ValidateNested()
  @Type(() => ImageDto)
  image: ImageDto;

  @ValidateNested()
  @Type(() => TileDto)
  tile: TileDto;

  @ValidateNested()
  @Type(() => DataDto)
  data: DataDto;
}

// Satellite stats DTO

class StatsBaseDto {
  @IsNotEmpty()
  std: number;

  @IsNotEmpty()
  p25: number;

  @IsNotEmpty()
  num: number;

  @IsNotEmpty()
  min: number;

  @IsNotEmpty()
  max: number;

  @IsNotEmpty()
  median: number;

  @IsNotEmpty()
  p75: number;

  @IsNotEmpty()
  mean: number;

  @IsNotEmpty()
  dt: number;
}

class SatelliteStatsDto {
  @ValidateNested({ each: true })
  @Type(() => StatsBaseDto)
  ndvi: StatsBaseDto[];

  @ValidateNested({ each: true })
  @Type(() => StatsBaseDto)
  evi: StatsBaseDto[];

  @ValidateNested({ each: true })
  @Type(() => StatsBaseDto)
  evi2: StatsBaseDto[];

  @ValidateNested({ each: true })
  @Type(() => StatsBaseDto)
  nri: StatsBaseDto[];

  @ValidateNested({ each: true })
  @Type(() => StatsBaseDto)
  dswi: StatsBaseDto[];

  @ValidateNested({ each: true })
  @Type(() => StatsBaseDto)
  ndwi: StatsBaseDto[];
}

// ScanData: soil data, weather data, satellite data and satellite statistics

class ScanDataDto {
  soil_data: SoilDataCollectionDto;
  weather_data: WeatherDataDto;
  satellite_data: SatelliteDataDto;
  satellite_stats: SatelliteStatsDto;
}

class ScansDto {
  @IsNotEmpty()
  uuid: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScanDataDto)
  scans: ScanDataDto[];
}

export class FarmAIrDTO {
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  layers: string[];

  @IsNotEmptyObject()
  geojson: FeatureCollectionDto;

  @IsNotEmptyObject()
  scans: ScansDto;
}
