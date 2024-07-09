import { Injectable } from '@nestjs/common';
import { Params } from 'nestjs-pino';
import pino from 'pino';

export interface ILoggerProvider {
  getLogger(): Params;
}

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
  TRACE = 'trace',
}

@Injectable()
export class LoggerProvider implements ILoggerProvider {
  public getLogger(): Params {
    return {
      pinoHttp: {
        useLevel: LogLevel.INFO as pino.Level,
        transport: {
          target: 'pino-pretty',
          options: {
            levelFirst: true,
            translateTime: true,
            ignore: 'pid,hostname',
          },
        },
      },
    };
  }
}
