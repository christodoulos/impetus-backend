import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AtticadtService } from './atticadt.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { NutsDto } from './dto/nuts.dto';
import { Public } from 'src/app.metadata';
import { Nuts } from './atticadt.schema';
import {
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('AtticaDT Management')
@Controller('atticadt')
export class AtticadtController {
  constructor(private atticadtService: AtticadtService) {}

  @Public()
  @Get('location/:name')
  @ApiOperation({ summary: 'Returns a map location by name' })
  @ApiParam({
    name: 'name',
    description: 'Map location name',
    example: 'attica',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Map location found',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Map location not found',
  })
  async findLocation(@Param('name') name: string) {
    const location = await this.atticadtService.findLocation(name);
    return location;
  }

  @Public()
  @Post('upload/nuts')
  @ApiOperation({
    summary:
      'Uploads a NUTS file downloaded from Eurostat (https://t.ly/OsCFL)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'NUTS file uploaded successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'NUTS file already uploaded or DB error',
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadNuts(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: NutsDto,
    @Res() res: Response,
  ): Promise<Response> {
    const nutsData: Nuts = {
      ...body,
      featureCollection: JSON.parse(file.buffer.toString()),
    };

    const message = await this.atticadtService.createNuts(nutsData);
    return res.status(HttpStatus.CREATED).json({ message });
  }
}
