import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FarmairService } from './farmair.service';
import { FarmAIrDTO } from './farmair.dto';

@ApiTags('farmAIr')
@Controller('farmair')
export class FarmairController {
  constructor(private readonly service: FarmairService) {}

  @Post()
  async farmairPostScan(@Body() data: FarmAIrDTO) {
    return await this.service.addScan(data);
  }

  @Get('/vineyard/:name')
  async farmairGetScan(@Param('name') name: string) {
    const vineyard = await this.service.getScan(name);
    // console.log(vineyard);
    return vineyard;
  }

  @Get('/scandata/:uuid')
  async farmairGetScanData(@Param('uuid') uuid: string) {
    const scanData = await this.service.findScanByUuid(uuid);
    return scanData;
  }
}
