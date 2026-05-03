import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../../src/app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('getSmokeStatus should return ok', (): void => {
    const actual = service.getSmokeStatus();

    expect(actual).toStrictEqual({ status: 'ok' });
  });
});
