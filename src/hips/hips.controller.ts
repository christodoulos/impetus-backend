import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/app.metadata';
import { HipsService } from './hips.service';

@ApiTags('Hips Management')
@Controller('hips')
export class HipsController {
  constructor(private readonly hipsService: HipsService) {}

  @Public()
  @Get('copernicus/:nuts_level/:experiment/:variable/:start_date/:end_date')
  async getHipsCopernicusByDates(
    @Param('nuts_level') nuts_level: string,
    @Param('experiment') experiment: string,
    @Param('variable') variable: string,
    @Param('start_date') start_date: string,
    @Param('end_date') end_date: string,
  ) {
    const collection = `${nuts_level}:${experiment}:${variable}`;
    return await this.hipsService.getHipsCopernicusByDates(
      collection,
      start_date,
      end_date,
    );
  }
}
