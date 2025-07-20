import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { swaggerInit } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);

  /* Swagger Setup moved to swagger.ts file */
  await swaggerInit(app);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
