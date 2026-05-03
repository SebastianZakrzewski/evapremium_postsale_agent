import { Injectable } from '@nestjs/common';
import type { SmokeTestResponse } from './models/smoke-test.response';

@Injectable()
export class AppService {
  getSmokeStatus(): SmokeTestResponse {
    return { status: 'ok' } as const;
  }
}
