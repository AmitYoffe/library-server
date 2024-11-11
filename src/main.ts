import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { allowedOrigins } from './config/allowedOrigins';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(allowedOrigins[0]);
  await app.listen(3000);
}
bootstrap();
