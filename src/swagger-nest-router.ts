import { NestApplication } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminRouteModules } from './router/routes/admin.routes.module';
import { PublicRouteModules } from './router/routes/public.routes.module';

export async function swaggerInit(app: NestApplication) {
  /* Admin Router Document Build and setup*/
  const adminRouterDocumentBuild = new DocumentBuilder()
    .setTitle('Todos API Admin Documentation')
    .setDescription(
      'This is the API documentation for the blog app for admins only.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const adminRouterDocument = SwaggerModule.createDocument(
    app,
    adminRouterDocumentBuild,
    {
      include: [AdminRouteModules],
    },
  );

  SwaggerModule.setup('api-docs/admin', app, adminRouterDocument, {
    customSiteTitle: 'Blogging App Backend - Admin',
    swaggerOptions: {
      tagsSorter: (a: string, b: string) => {
        if (a === 'Authentication') return -100;
        if (b === 'Authentication') return 100;

        return a > b ? 1 : -1;
      },
      docExpansion: false,
      persistAuthorization: true,
    },
  });

  /* Public Router Document Build and setup*/
  const publicRouterDocumentBuild = new DocumentBuilder()
    .setTitle('Todos API Public Documentation')
    .setDescription(
      'This is the API documentation for the blog app for public users.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const publicRouterDocument = SwaggerModule.createDocument(
    app,
    publicRouterDocumentBuild,
    {
      include: [PublicRouteModules],
    },
  );

  SwaggerModule.setup('api-docs/public', app, publicRouterDocument, {
    customSiteTitle: 'Blogging App Backend - Public',
    swaggerOptions: {
      tagsSorter: (a: string, b: string) => {
        if (a === 'Authentication') return -100;
        if (b === 'Authentication') return 100;

        return a > b ? 1 : -1;
      },
      docExpansion: false,
      persistAuthorization: true,
    },
  });
}
