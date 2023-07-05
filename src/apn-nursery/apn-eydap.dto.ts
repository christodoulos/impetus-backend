import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class ApnEydapDTO {
  @IsDate()
  @ApiProperty()
  ts: Date;

  @IsNumber()
  @ApiProperty()
  ec: number;

  @IsNumber()
  @ApiProperty()
  tc: number;

  @IsNumber()
  @ApiProperty()
  bod5: number;

  @IsNumber()
  @ApiProperty()
  tss: number;

  @IsNumber()
  @ApiProperty()
  turbidity: number;

  @IsNumber()
  @ApiProperty()
  tn: number;

  @IsNumber()
  @ApiProperty()
  nh4: number;
}
