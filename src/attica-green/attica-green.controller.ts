import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

import { AtticaGreenService } from './attica-green.service';
import * as ExcelJS from 'exceljs';
import { Public } from 'src/app.metadata';

@Controller('attica-green')
export class AtticaGreenController {
  constructor(private atticaGreenService: AtticaGreenService) {}

  @Public()
  @Get('irrigation-to-excel')
  async irrigationToExcel(@Res() res: Response) {
    const buffer = await this.atticaGreenService.irrigationToExcel();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + 'irrigation.xlsx',
    );

    res.send(buffer);
  }
}
