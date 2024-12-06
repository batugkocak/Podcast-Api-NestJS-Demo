import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { ConfigModule } from '../config/config.module';

describe('EpisodesController', () => {
  let controller: EpisodesController;
  // Before writing each test, we have to provide the Service and import the ConfigModule as we are doing it in the controller itself.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EpisodesController],
      providers: [EpisodesService],
      imports: [ConfigModule],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
