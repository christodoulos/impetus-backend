import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AtticadtService } from './atticadt.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { NutsDto } from './dto/nuts.dto';
import { Public } from 'src/app.metadata';
import { Nuts } from './atticadt.schema';

@Controller('atticadt')
export class AtticadtController {
  constructor(private atticadtService: AtticadtService) {}

  @Public()
  @Get('location/:name')
  async findLocation(@Param('name') name: string) {
    const location = await this.atticadtService.findLocation(name);
    return location;
  }

  @Public()
  @Post('upload/nuts')
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
      return this.atticadtService.createNuts(nutsData);
    } catch (error) {
      console.log(error);
    }
  }
}
