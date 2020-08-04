import { Get, Post, Put, Controller, Req, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private dataService: DataService) {}

  @Get()
  async findAll(@Req() request: Request) {
    // This action returns all data
    const items = await this.dataService.getAllWorkItems();
    return items;
  }
}
