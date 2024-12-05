import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { EpisodesController } from './episodes.controller';

@Module({
  imports: [ConfigModule],
  controllers: [EpisodesController],
})
export class EpisodesModule {}
