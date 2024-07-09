import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { description, name, version } from './package.json';

export const swaggerLoad = (app: INestApplication, globalPrefix: string): void => {
  const options = new DocumentBuilder()
    .setTitle(`${name.charAt(0).toUpperCase() + name.slice(1)} API`)
    .setDescription(description)
    .addBearerAuth()
    .setVersion(version)
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, options);

  const persistentAuth = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  SwaggerModule.setup(`${globalPrefix ?? ''}/swagger`, app, swaggerDocument, persistentAuth);
};
