import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//todo:  pass the url to .env 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: 'https://localhost:3000' });
  await app.listen(3000);
}
bootstrap();
