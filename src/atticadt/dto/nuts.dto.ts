import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NutsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'NUTS scale in meters',
    example: '03',
  })
  scale: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
    description: 'NUTS file downloaded from Eurostat (https://t.ly/WY6eh).',
  })
  file: Express.Multer.File;
}
