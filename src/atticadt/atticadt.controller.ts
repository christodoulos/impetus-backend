import { Controller, Get, Param } from '@nestjs/common';
import { AtticadtService } from './atticadt.service';
import { Public } from 'src/app.metadata';

@Controller('atticadt')
export class AtticadtController {
  constructor(private atticadtService: AtticadtService) {}

  @Public()
  @Get('location/:name')
  async findLocation(@Param('name') name: string) {
    const location = await this.atticadtService.findLocation(name);
    return location;
  }
}
