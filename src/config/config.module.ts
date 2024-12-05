import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [ConfigService],
  exports: [ConfigService], // This is for making the ConfigService available to other modules.
  // We were already importing the ConfigModule in the EpisodesModule, but we were not exporting the ConfigService. Now we can use constructor injection in the EpisodesService.
  // You actually can import this service to wherever you want in your application that imported the ConfigModule.
  // This is the power of the module system in NestJS and you don't even have to know what Dependency Injection is to use it.
})
export class ConfigModule {}
