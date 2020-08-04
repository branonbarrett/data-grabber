import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Windmill } from './windmill-model';

@Injectable()
export class DataService {

  constructor(
    @InjectRepository(Windmill)
    private readonly dataRepository: Repository<Windmill>,
  ) {}

  async getAllWorkItems() {
    const items = await this.dataRepository.find({
      order: { createdAt: 'ASC' },
    });

    return items;
  }

  sanitizeData(data: any) {
    delete data.createdAt;
    delete data.updatedAt;
  }
}
