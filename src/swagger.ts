/* This swagger setup is for using showing seperate controller for seperate swagger page but the controllers stay in the same module without using the NestRouter */
// This is hackey way
// see swagger-nest-router.ts file for swagger setup using nestjs router

import { NestApplication } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdminsModule } from './modules/admins/admins.module';
import { UsersModule } from './modules/users/users.module';
import { TodosModule } from './modules/todos/todos.module';
import { AuthModule } from './modules/auth/auth.module';
import {
  ADMIN_API_PATH,
  PUBLIC_API_PATH,
} from './constants/controller-prefix.constant';

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
      include: [AuthModule, AdminsModule, UsersModule, TodosModule],
    },
  );

  adminRouterDocument.paths = Object.keys(adminRouterDocument.paths)
    .filter((eachPath) => eachPath.startsWith(ADMIN_API_PATH))
    .reduce((acc, path) => {
      acc[path] = adminRouterDocument.paths[path];
      return acc;
    }, {});

  SwaggerModule.setup('api-docs/admin', app, adminRouterDocument, {
    customSiteTitle: 'Blogging App Backend - Admin',
    swaggerOptions: {
      tagsSorter: (a: string, b: string) => {
        if (a === 'Authentication') return -100;
        if (b === 'Authentication') return 100;
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
      include: [AuthModule, TodosModule],
    },
  );
  publicRouterDocument.paths = Object.keys(publicRouterDocument.paths)
    .filter((eachPath) => eachPath.startsWith(PUBLIC_API_PATH))
    .reduce((acc, path) => {
      acc[path] = publicRouterDocument.paths[path];
      return acc;
    }, {});

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
