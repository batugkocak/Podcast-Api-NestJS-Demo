import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { ConfigModule } from '../config/config.module';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockEpisodesService = {
    findAll: async () => [{ id: 'id' }],
    findFeaturedEpisodes: async () => [{ id: 'id' }],
    findOne: async () => ({ id: 'id' }),
    create: async () => ({ id: 'id' }),
  };

  // Before writing each test, we have to provide the Service and import the ConfigModule as we are doing it in the controller itself.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EpisodesController],
      providers: [{ provide: EpisodesService, useValue: mockEpisodesService }],
      imports: [ConfigModule],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return correct response', async () => {
      const episodeID = 'id';
      const result = await controller.findOne(episodeID);
      expect(result).toEqual({ id: 'id' });
    });
  });
});
