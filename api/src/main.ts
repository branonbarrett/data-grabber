import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = 3000;

  try {
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(port);

    Logger.log(`Fieldwrx API listening on port ${port}`);
  } catch (error) {
    Logger.log(`Error starting API on port ${port}`);
    throw error;
  }
}
bootstrap();
