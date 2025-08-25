import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerInit } from './swagger-nest-router';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  const logger = new Logger('NestApplication');

  // set global prefix before swagger initialization
  // not necessary if nest router is utilized
  // if (API_PREFIX) {
  //   app.setGlobalPrefix(API_PREFIX);
  // }

  /* Swagger Setup moved to swagger.ts file */
  await swaggerInit(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const PORT = process.env.PORT ?? 3000;

  await app.listen(PORT).then(() => logger.log(`App Running at PORT ${PORT}`));
}
bootstrap();
