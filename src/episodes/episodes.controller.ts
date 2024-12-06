import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDTO } from './dto/episode.dto';
import { ConfigService } from '../config/config.service';

@Controller('episodes')
export class EpisodesController {
  constructor(
    private epsiodesService: EpisodesService,
    private configService: ConfigService,
  ) {}

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
  async findOne(@Param('episodeId') episodeId: string) {
    console.log(episodeId);
    const episode = await this.epsiodesService.findOne(episodeId);
    if (!episode) {
      // throw new HttpException('Episode not found', HttpStatus.NOT_FOUND);
      throw new NotFoundException('Episode not found');
    }
    return episode;
  }

  @Post() // POST /episodes
  create(@Body() input: CreateEpisodeDTO) {
    console.log(input);
    return this.epsiodesService.create(input);
  }
}
