import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Irrigation,
  IrrigationData,
  IrrigationDataDocument,
  IrrigationDocument,
  ClimaData,
  ClimaDataDocument,
} from './attica-green.schema';
import * as ExcelJS from 'exceljs';

function collection2workbook(
  data: any[],
  headers: string[],
  workbookLabel: string,
  workbook: ExcelJS.Workbook,
) {
  const worksheet = workbook.addWorksheet(workbookLabel);
  worksheet.columns = headers.map((header) => {
    if (header === 'timestamp') {
      return { header, key: header, style: { numFmt: 'dd/mm/yyyy hh:mm:ss' } };
    } else {
      return { header, key: header };
    }
  });
  data = data.sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  });
  data.forEach((obj) => worksheet.addRow(obj));
}

@Injectable()
export class AtticaGreenService {
  constructor(
    @InjectModel(Irrigation.name, 'attica_green')
    private readonly irrigationModel: Model<IrrigationDocument>,
    @InjectModel(IrrigationData.name, 'attica_green')
    private readonly irrigationDataModel: Model<IrrigationDataDocument>,
    @InjectModel(ClimaData.name, 'attica_green')
    private readonly climaDataModel: Model<ClimaDataDocument>,
  ) {}

  // prettier-ignore
  async irrigationToExcel(): Promise<ExcelJS.Buffer> {
    const irrigation = await this.irrigationModel.find().select({ _id: 0, __v: 0 }).lean();
    const irrigationData = await this.irrigationDataModel.find().select({ _id: 0, __v: 0 }).lean();
    const climaData = await this.climaDataModel.find().select({ _id: 0, __v: 0 }).lean();
    const workbook = new ExcelJS.Workbook();
    let headers = [ 'index', 'timestamp', 'start', 'end', 'conductivity_target', 'ph_target', 'conductivity', 'ph', 'disposal_time', 'valve1_time', 'valve2_time', 'valve3_time', 'valve4_time', 'valve5_time', 'valve6_time', 'valve7_time', 'valve8_time', 'valve9_time', 'valve10_time', 'valve_fertilizer_a', 'valve_fertilizer_b', 'valve_fertilizer_c', 'valve_fertilizer_d', 'valve_fertilizer_e', 'valve_fertilizer_f', 'valve_fertilizer_g', 'valve_fertilizer_h', 'valve_fertilizer_i', 'valve_fertilizer_j', 'valve_fertilizer_acid', 'empty', ];
    collection2workbook(irrigation, headers, 'Irrigation', workbook);
    headers = [ 'timestamp', 'temperature_water', 'conductivity_water', 'ph_water', 'temperature_runoff_1', 'conductivity_runoff_1', 'ph_runoff_1', 'temperature_runoff_2', 'conductivity_runoff_2', 'ph_runoff_2', 'sum_runoff_volume_1', 'sum_runoff_volume_2', 'sum_pump_time', 'sum_waterings_volume_1', 'sum_waterings_volume_2', 'empty', ];
    collection2workbook(irrigationData, headers, 'Irrigation Data', workbook);
    headers = ['timestamp', 'temperature_out', 'humidity_out', 'sunshine', 'temperature_1', 'temperature_2', 'humidity_1', 'humidity_2', 'is_raining', 'windows_1', 'windows_2', 'empty_1', 'empty_2', 'empty_3', 'empty_4', 'empty_5' ]
    collection2workbook(climaData, headers, 'Clima Data', workbook);
    
    return await workbook.xlsx.writeBuffer();
  }
}
