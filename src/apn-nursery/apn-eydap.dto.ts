import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class ApnEydapDTO {
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  @ApiProperty({
    description: "The date of ΕΥΔΑΠ's sampling (defaults to NOW)",
    default: new Date(),
  })
  ts: Date;

  @IsNumber()
  @ApiProperty({
    description: 'E.coil per 100 ml (cfu/100ml)',
    minimum: 0,
    maximum: 10,
    default: 0,
  })
  ec: number;

  @IsNumber()
  @ApiProperty({
    description: 'Total Coliform per 100 ml (cfu/100ml)',
    minimum: 0,
    maximum: 10,
    default: 0,
  })
  tc: number;

  @IsNumber()
  @ApiProperty({
    description: 'BOD5 in mg/l',
    minimum: 0,
    maximum: 10,
    default: 0,
  })
  bod5: number;

  @IsNumber()
  @ApiProperty({
    description: 'TSS in mg/l',
    minimum: 0,
    maximum: 10,
    default: 0,
  })
  tss: number;

  @IsNumber()
  @ApiProperty({
    description: 'Turbidity in NTU',
    minimum: 0,
    maximum: 10,
    default: 0,
  })
  turbidity: number;

  @IsNumber()
  @ApiProperty({
    description: 'TN in mg/l',
    minimum: 0,
    maximum: 10,
    default: 0,
  })
  tn: number;

  @IsNumber()
  @ApiProperty({
    description: 'N-Nh4+ in mg/l',
    minimum: 0,
    maximum: 10,
    default: 0,
  })
  nh4: number;
}
