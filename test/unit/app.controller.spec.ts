import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../src/app.controller';
import { AppService } from '../../src/app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async (): Promise<void> => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getSmokeTest', () => {
    it('should return ok status', (): void => {
      const actual = appController.getSmokeTest();

      expect(actual).toStrictEqual({ status: 'ok' });
    });
  });
});
