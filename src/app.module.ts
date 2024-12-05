import { Module } from '@nestjs/common';
import { EpisodesModule } from './episodes/episodes.module';
import { TopicsModule } from './topics/topics.module';

@Module({
  imports: [EpisodesModule, TopicsModule],
})
export class AppModule {}
