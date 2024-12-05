import { Body, Controller, Get, Post, Query, Param } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDTO } from './dto/episode.dto';

@Controller('episodes')
export class EpisodesController {
  constructor(private epsiodesService: EpisodesService) {}

  @Get() // GET /episodes
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
    console.log(sort);
    return this.epsiodesService.findAll(sort);
  }

  @Get('featured') // GET /episodes/featured
  findFeatured() {
    return this.epsiodesService.findFeatured();
  }

  @Get(':episodeId') // GET /episodes/1
  findOne(@Param('episodeId') episodeId: string) {
    return this.epsiodesService.findOne(episodeId);
  }

  @Post() // POST /episodes
  create(@Body() input: CreateEpisodeDTO) {
    console.log(input);
    return this.epsiodesService.create(input);
  }
}
