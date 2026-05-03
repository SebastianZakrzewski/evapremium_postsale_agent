import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeEach(async (): Promise<void> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterEach(async (): Promise<void> => {
    await app.close();
  });

  it('/admin/test (GET)', async (): Promise<void> => {
    const response = await request(app.getHttpServer()).get('/admin/test');

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({ status: 'ok' });
  });
});
