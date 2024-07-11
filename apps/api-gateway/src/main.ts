import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';

import { swaggerLoad } from '../swagger';
import { AppModule } from './app.module';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);

  // logger pino use
  app.useLogger(app.get(Logger));
  const logger = await app.resolve(PinoLogger);
  logger.setContext('Bootstrap');

  // TypeORM
  const dataSource = app.get(DataSource);
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  logger.info(`Seeded database connection`);
  // await runSeeders(dataSource);
  logger.info('Seeding is finished');

  // Validation request data to Type in code
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  // Transform request data to type with class-transformer`
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: false,
      // https://stackoverflow.com/questions/59531427/why-should-we-not-use-enableimplicitconversion-when-using-class-transformer
      transformOptions: {
        enableImplicitConversion: false,
      },
    }),
  );

  // Shutdown hooks
  app.enableShutdownHooks();

  const port = configService.get('PORT');
  await app.listen(port);
  logger.warn(`Listening to http://localhost:${port}`);
};
void bootstrap().then();
