import { Test, TestingModule } from '@nestjs/testing';
import { RecipeHelperController } from './recipe-helper.controller';

describe('RecipeHelperController', () => {
  let controller: RecipeHelperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeHelperController],
    }).compile();

    controller = module.get<RecipeHelperController>(RecipeHelperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
