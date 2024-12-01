import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const clientURL: string = configService.get("CLIENT_URL")
  const LOCAL_PORT: number = configService.get("LOCAL_PORT")

  app.enableCors({ origin: clientURL });
  await app.listen(LOCAL_PORT);
}
bootstrap();
