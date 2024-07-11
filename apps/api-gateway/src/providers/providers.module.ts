import { Module } from '@nestjs/common';

import { LoggerModule } from './logger/logger.module';
import { TypeormModule } from './typeorm/typeorm.module';

@Module({
  imports: [TypeormModule, LoggerModule],
  providers: [],
  exports: [],
})
export class ProvidersModule {}
