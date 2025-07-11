import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerDocumentBuild = new DocumentBuilder()
    .setTitle('Todos API Documentation')
    .setDescription('This is the API documentation for the todo app.')
    .setVersion('1.0')
    .build();
  const todosDocument = () =>
    SwaggerModule.createDocument(app, swaggerDocumentBuild);
  SwaggerModule.setup('api-docs', app, todosDocument, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      docExpansion: false,
    },
    // Visit https://swagger.io/docs/open-source-tools/swagger-ui/usage/configuration/ for more swagger options
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
