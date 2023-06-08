import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class ApnPLCDTO {
  @IsNotEmpty()
  @IsDate()
  ts: Date;

  @IsNotEmpty()
  @IsNumber()
  col3: number;

  @IsNotEmpty()
  @IsNumber()
  col4: number;

  @IsNotEmpty()
  @IsNumber()
  col5: number;

  @IsNotEmpty()
  @IsNumber()
  col6: number;

  @IsNotEmpty()
  @IsNumber()
  col7: number;

  @IsNotEmpty()
  @IsNumber()
  col8: number;

  @IsNotEmpty()
  @IsNumber()
  col9: number;

  @IsNotEmpty()
  @IsNumber()
  col10: number;

  @IsNotEmpty()
  @IsNumber()
  col11: number;

  @IsNotEmpty()
  @IsNumber()
  col12: number;

  @IsNotEmpty()
  @IsNumber()
  col13: number;

  @IsNotEmpty()
  @IsNumber()
  col14: number;
}
