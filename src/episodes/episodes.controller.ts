import { Body, Controller, Get, Post, Query, Param } from '@nestjs/common';

@Controller('episodes')
export class EpisodesController {
  @Get() // GET /episodes
  findAll(@Query('sort') sort: 'ASC' | 'DESC' = 'DESC') {
    console.log(sort);
    return 'This action returns all episodes';
  }

  @Get('featured') // GET /episodes/featured
  findFeatured() {
    return 'This action returns all featured episodes';
  }

  @Get(':episodeId') // GET /episodes/1
  findOne(@Param('episodeId') episodeId: string) {
    return `This action returns a #${episodeId} episode`;
  }

  @Post() // POST /episodes
  create(@Body() input: any) {
    console.log(input);
    return 'This action adds a new episode';
  }
}
