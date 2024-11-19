import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const clinetURL: string = configService.get("CLIENT_URL")

  app.enableCors({ origin: clinetURL });
  await app.listen(3000);
}
bootstrap();
