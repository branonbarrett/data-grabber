import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Windmill } from './windmill.model';

enum Layers {
  potentialCommercialWindAreasSmall = 'vt_pscwa',
  potentialCommercialWindAreasLarge = 'vt_plcwa',
  activeCommercialWindAreas = 'vt_resw',
}

export interface Layer {
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
] as Layer[];

@Injectable()
export class DataService {

  constructor(
    @InjectRepository(Windmill)
    private readonly dataRepository: Repository<Windmill>,
  ) {}

  async getAllData(layerName: string) {
    const tableName = this.getTableName(layerName);

    const items = await this.dataRepository.query(`
      SELECT st_asgeojson(ST_GeomFromWKB(wkb_geometry)) as geojson FROM ${tableName}
      order by ST_XMin(ST_Envelope(ST_GeomFromWKB(wkb_geometry)))
      limit 1000;
    `);

    return items.map(x => JSON.parse(x.geojson));
  }

  async getByBounds(bounds: number[], layerName: string) {
    const tableName = this.getTableName(layerName);

    const query = `
      SELECT objectid, windspd_mph, st_asgeojson(ST_GeomFromWKB(wkb_geometry)) as geojson FROM ${tableName}
      where st_intersects(wkb_geometry, ST_MakeEnvelope(${bounds[0]}, ${bounds[1]}, ${bounds[2]}, ${bounds[3]}))
      limit 1000;
    `;
    // console.log(query);
    const items = await this.dataRepository.query(query);

    return items.map((row: { geojson: any, objectid: number, windspd_mph: number}) => {
      return {
        objectid: row.objectid,
        wind_speed: row.windspd_mph,
        geom: JSON.parse(row.geojson),
      };
    });
  }

  getLayers(): Layer[] {
    return layers;
  }

  sanitizeData(data: any) {
    delete data.createdAt;
    delete data.updatedAt;
  }

  getTableName(layer: string) {
    let tableName = 'vt_resw'; // default
    switch (layer) {
      case Layers.activeCommercialWindAreas:
        tableName = Layers.activeCommercialWindAreas;
        break;
      case Layers.potentialCommercialWindAreasSmall:
        tableName = Layers.potentialCommercialWindAreasSmall;
        break;
      case Layers.potentialCommercialWindAreasLarge:
        tableName = Layers.potentialCommercialWindAreasLarge;
        break;
      default:
        break;
    }

    return tableName;
  }
}
