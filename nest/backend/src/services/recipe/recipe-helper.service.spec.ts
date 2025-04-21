import { Test, TestingModule } from '@nestjs/testing';
import { RecipeHelperService } from './recipe-helper.service';

describe('RecipeHelperService', () => {
  let service: RecipeHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeHelperService],
    }).compile();

    service = module.get<RecipeHelperService>(RecipeHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
