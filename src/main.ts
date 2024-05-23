import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { json } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(express.static('src/uploads'));
  await app.listen(5014);
}
bootstrap();
