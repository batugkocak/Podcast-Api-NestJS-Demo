import { Injectable } from '@nestjs/common';
import Episode from './entity/episode.entity';
import { randomUUID } from 'crypto';
import { CreateEpisodeDTO } from './dto/episode.dto';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];

  async findAll(sort: 'asc' | 'desc' = 'asc'): Promise<Episode[]> {
    const sortAsc = (a: Episode, b: Episode) => (a.name > b.name ? 1 : -1);
    const sortDesc = (a: Episode, b: Episode) => (a.name < b.name ? 1 : -1);

    return sort === 'asc'
      ? this.episodes.sort(sortAsc)
      : this.episodes.sort(sortDesc);
  }

  async findFeatured(): Promise<Episode> {
    return this.episodes.find((episode) => episode.featured);
  }
  async findOne(id: string): Promise<Episode> {
    return this.episodes.find((episode) => episode.id === id);
  }
  async create(createEpisodeDto: CreateEpisodeDTO) {
    const newEpisode: Episode = { id: randomUUID(), ...createEpisodeDto };
    this.episodes.push(newEpisode);
    return newEpisode;
  }
}
