import { Get, Controller, Req, Param, BadRequestException, Query } from '@nestjs/common';
import { Request } from 'express';
import { DataService } from './data.service';

@Controller('layers')
export class DataController {
  constructor(private dataService: DataService) {}

  @Get(':layer')
  async findAll(@Param() params, @Query() query) {
    if (query.bbox) {
      const coordsStr = query.bbox.split(',');
      const coords = coordsStr.map(x => parseFloat(x));
      if (coords.length !== 4) {
        throw new BadRequestException('Invalid query params');
      }
      const items = await this.dataService.getByBounds(coords, params.layer);
      return items;
    } else {
      // This action returns all data for a given dataset
      const items = await this.dataService.getAllData(params.layer);
      return items;
    }
  }

  @Get()
  getLayers(@Req() request: Request) {
    return this.dataService.getLayers();
  }
}
