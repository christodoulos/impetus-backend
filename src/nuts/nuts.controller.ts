import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

import { NutsService } from './nuts.service';
import { NutsDto } from './nuts.dto';
import { Nuts } from './nuts.schema';
import { Public } from 'src/app.metadata';

@Controller('nuts')
export class NutsController {
  constructor(private readonly nutsService: NutsService) {}

  @Public()
  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadNuts(
    @UploadedFiles() files: Express.Multer.File,
    @Body() body: NutsDto,
  ): Promise<boolean[]> {
    const nutsData: Nuts = {
      ...body,
      featureCollection: JSON.parse(files[0].buffer.toString()),
    };

    try {
      return this.nutsService.createNuts(nutsData);
    } catch (error) {
      console.log(error);
    }
  }
}
