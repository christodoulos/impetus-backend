import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class LngLatDto {
  @IsNotEmpty() @IsNumber() lng: number;
  @IsNotEmpty() @IsNumber() lat: number;
}

export class CreatePlaceDto {
  @IsNotEmpty() @IsString() name: string;
  @IsNotEmpty() @IsNumber() zoom: number;
  @IsNotEmpty() @IsNumber() pitch: number;
  @IsNotEmpty() @IsNumber() bearing: number;
  center: LngLatDto;
}
