import { IsString, IsNotEmpty } from 'class-validator';

export class NutsDto {
  @IsNotEmpty() @IsString() readonly year: string;
  @IsNotEmpty() @IsString() readonly geometryType: string;
  @IsNotEmpty() @IsString() readonly scale: string;
  @IsNotEmpty() @IsString() readonly crs: string;
}
