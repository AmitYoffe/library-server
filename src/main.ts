import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
  });

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const clientURL = configService.get('CLIENT_URL');
  const LOCAL_PORT = configService.get('LOCAL_PORT');

  app.enableCors({ origin: clientURL });
  await app.listen(LOCAL_PORT);
}

bootstrap();
