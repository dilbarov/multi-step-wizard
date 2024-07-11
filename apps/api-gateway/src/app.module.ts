import { Module } from '@nestjs/common';

import { DomainsModule } from './modules/domains.module';
import { ProvidersModule } from './providers';
import { SharedModule } from './shared';

@Module({
  imports: [SharedModule, ProvidersModule, DomainsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
