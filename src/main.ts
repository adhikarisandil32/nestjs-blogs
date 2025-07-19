import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TodosModule } from './modules/todos/todos.module';
import { AuthModule } from './modules/auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerDocumentBuild = new DocumentBuilder()
    .setTitle('Todos API Documentation')
    .setDescription('This is the API documentation for the todo app.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const todosDocument = () =>
    SwaggerModule.createDocument(app, swaggerDocumentBuild, {
      // for excluding modules and routes
      include: [TodosModule, AuthModule],
    });

  SwaggerModule.setup('api-docs', app, todosDocument, {
    customSiteTitle: 'Blogging App Backend',
    swaggerOptions: {
      tagsSorter: (a: string, b: string) => {
        if (a === 'Auth') return -100;
        if (b === 'Auth') return 100;
        // if Auth tag, always keep if a top priority
        // tags are the names provided in swagger, you can manually provide them using @ApiTags('<tag_name>') on controller
        // here a and b are tag names

        return a > b ? 1 : -1;
        //if not then sort alphabetically
        // or you can go tagsSorter: 'alpha', to sort overall tags alphabetically
      },
      docExpansion: false,
      persistAuthorization: true, // to persist authorization on browser reload
    },
    // Visit https://swagger.io/docs/open-source-tools/swagger-ui/usage/configuration/ for more swagger options
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
