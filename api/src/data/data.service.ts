import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Windmill } from './windmill.model';

enum Layers {
  potentialCommercialWindAreasSmall = 'vt_pscwa',
  potentialCommercialWindAreasLarge = 'vt_plcwa',
  activeCommercialWindAreas = 'vt_resw',
}

interface Layer {
  displayName: string;
  name: string;
  type: string;
}

const layers = [
  {
    displayName: 'Potential Commercial Wind Areas Small',
    name: 'vt_pscwa',
    type: 'Polygon',
  },
  {
    displayName: 'Potential Commercial Wind Areas Large',
    name: 'vt_plcwa',
    type: 'Polygon',
  },
  {
    displayName: 'Active Commercial Wind Areas',
    name: 'vt_resw',
    type: 'Point',
  },
];

@Injectable()
export class DataService {

  constructor(
    @InjectRepository(Windmill)
    private readonly dataRepository: Repository<Windmill>,
  ) {}

  async getAllWorkItems(layer: string) {
    // hacky switch statement here
    switch (layer) {
      case Layers.activeCommercialWindAreas:
        
        break;
      case Layers.potentialCommercialWindAreasLarge:
        
        break;
      case Layers.potentialCommercialWindAreasLarge:
        
        break;
      default:
        break;
    }
    const items = await this.dataRepository.find({
      order: { createdAt: 'ASC' },
    });

    return items;
  }

  getLayers(): Layer[] {
    return layers;
  }

  sanitizeData(data: any) {
    delete data.createdAt;
    delete data.updatedAt;
  }
}
