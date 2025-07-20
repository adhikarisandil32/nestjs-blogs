import { NestApplication } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminRouterModule } from './router/routes/admin.route.module';
import { PublicRouterModule } from './router/routes/public.route.module';

export async function swaggerInit(app: NestApplication) {
  /* Admin Router Document Build and setup*/
  const adminRouterDocumentBuild = new DocumentBuilder()
    .setTitle('Todos API Admin Documentation')
    .setDescription(
      'This is the API documentation for the todo app for admins only.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const adminRouterDocument = SwaggerModule.createDocument(
    app,
    adminRouterDocumentBuild,
    {
      deepScanRoutes: true,
      include: [AdminRouterModule],
    },
  );

  SwaggerModule.setup('api-docs/admin', app, adminRouterDocument, {
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
      // Visit https://swagger.io/docs/open-source-tools/swagger-ui/usage/configuration/ for more swagger options
    },
  });

  /* Public User Document Build and setup */
  const publicRouterDocumentBuild = new DocumentBuilder()
    .setTitle('Todos API Public Documentation')
    .setDescription(
      'This is the API documentation for the todo app for public users.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const publicRouterDocument = SwaggerModule.createDocument(
    app,
    publicRouterDocumentBuild,
    {
      deepScanRoutes: true,
      include: [PublicRouterModule],
    },
  );

  SwaggerModule.setup('api-docs/public', app, publicRouterDocument, {
    customSiteTitle: 'Blogging App Backend',
    swaggerOptions: {
      tagsSorter: (a: string, b: string) => {
        if (a === 'Auth') return -100;
        if (b === 'Auth') return 100;

        return a > b ? 1 : -1;
      },
      docExpansion: false,
      persistAuthorization: true,
    },
  });
}
