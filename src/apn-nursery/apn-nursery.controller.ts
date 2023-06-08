import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApnNurseryService } from './apn-nursery.service';
import { ApnPLCDTO } from './apn-nursery.dto';

@ApiTags('Athens Plant Nursery')
@Controller('apn-nursery')
export class ApnNurseryController {
  constructor(private readonly service: ApnNurseryService) {}

  @Get('metrics/:limit')
  @ApiOperation({ summary: 'Get the last {limit} (0=all) PLC metrics' })
  @ApiResponse({ status: 200, description: 'Success' })
  async apnNurseryGetMetrics(@Param('limit') limit: number) {
    const metrics = await this.service.getPLCMetrics(limit);
    return metrics;
  }

  @Get('metrics/temperature-membrane-tank-5/:limit')
  async apnNurserygetTemperatureMembraneTank5(@Param('limit') limit: number) {
    const metrics = await this.service.getTemperatureMembraneTank5(limit);
    return metrics;
  }

  @Get('metrics/ph-membrane-tank-5/:limit')
  async apnNurserygetPHMembraneTank5(@Param('limit') limit: number) {
    const metrics = await this.service.getPHMembraneTank5(limit);
    return metrics;
  }

  @Get('metrics/do-aeriation-tank-4a/:limit')
  async apnNurseryDOAeriationTank4A(@Param('limit') limit: number) {
    const metrics = await this.service.DOAeriationTank4A(limit);
    return metrics;
  }

  @Get('metrics/do-anoxic-tank-3/:limit')
  async apnNurseryDOAnoxicTank3(@Param('limit') limit: number) {
    const metrics = await this.service.DOAnoxicTank3(limit);
    return metrics;
  }

  @Get('metrics/mlss-solid-tank-5/:limit')
  async apnNurseryMLSSSolidTank5(@Param('limit') limit: number) {
    const metrics = await this.service.MLSSSolidTank5(limit);
    return metrics;
  }

  @Get('metrics/mlss-solid-tank-4a/:limit')
  async apnNurseryMLSSSolidTank4A(@Param('limit') limit: number) {
    const metrics = await this.service.MLSSSolidTank4A(limit);
    return metrics;
  }

  @Get('metrics/lddo-anoxic/:limit')
  async apnNurseryLDODOAnoxic(@Param('limit') limit: number) {
    const metrics = await this.service.LDODOAnoxic(limit);
    return metrics;
  }

  @Get('metrics/temperature-anoxic/:limit')
  async apnNurseryTemperatureAnoxic(@Param('limit') limit: number) {
    const metrics = await this.service.TemperatureAnoxic(limit);
    return metrics;
  }

  @Get('metrics/turbidity-tank-10/:limit')
  async apnNurseryTurbidityTank10(@Param('limit') limit: number) {
    const metrics = await this.service.TurbidityTank10(limit);
    return metrics;
  }

  @Get('metrics/lt-1/:limit')
  async apnNurseryLT1(@Param('limit') limit: number) {
    const metrics = await this.service.LT1(limit);
    return metrics;
  }

  @Get('metrics/lt-2/:limit')
  async apnNurseryLT2(@Param('limit') limit: number) {
    const metrics = await this.service.LT2(limit);
    return metrics;
  }

  @Get('metrics/lt-3/:limit')
  async apnNurseryLT3(@Param('limit') limit: number) {
    const metrics = await this.service.LT3(limit);
    return metrics;
  }
}
