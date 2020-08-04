import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataController } from './data/data.controller';
import { DataService } from './data/data.service';
import { DataModule } from './data/data.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'dev',
      password: process.env.DB_PASSWORD || 'dev',
      database: process.env.DB_DATABASE || 'data_grabber',
      entities: [__dirname + '/**/*.model.ts'],
      synchronize: true,
    }),
    DataModule,
    HttpModule,
  ],
  controllers: [DataController],
  providers: [DataService],
})
export class AppModule {}
