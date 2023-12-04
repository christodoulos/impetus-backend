import { IsNumber, IsString } from 'class-validator';

class LngLatDto {
  @IsNumber() lng: number;
  @IsNumber() lat: number;
}

export class CreatePlaceDto {
  @IsString() name: string;
  @IsNumber() zoom: number;
  @IsNumber() pitch: number;
  @IsNumber() bearing: number;
  center: LngLatDto;
}
