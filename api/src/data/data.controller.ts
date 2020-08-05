import { Get, Controller, Req, Param, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { DataService } from './data.service';

@Controller('layers')
export class DataController {
  constructor(private dataService: DataService) {}

  @Get(':layer')
  async findAll(@Param() params) {
    // This action returns all data for a given dataset
    const items = await this.dataService.getAllWorkItems(params.layer);
    return items;
  }

  @Get()
  async getLayers(@Req() request: Request) {
    return this.dataService.getLayers();
  }
}
