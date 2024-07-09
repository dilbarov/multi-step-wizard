import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

import { LoggerProvider } from './logger.provider';

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [],
      providers: [LoggerProvider],
      inject: [LoggerProvider],
      useFactory: (loggerProvider: LoggerProvider) => {
        return loggerProvider.getLogger();
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class LoggerModule {}
