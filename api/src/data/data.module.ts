import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataService } from './data.service';
import { Windmill } from './windmill.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Windmill]),
  ],
  providers: [DataService],
})
export class DataModule {}
