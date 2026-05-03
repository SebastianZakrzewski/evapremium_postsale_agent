import { Controller, Get } from '@nestjs/common';
import type { SmokeTestResponse } from '../models/smoke-test.response';

/** HTTP surface for the postsale agent; keep handlers thin and delegate to services. */
@Controller('agent')
export class AgentController {
  @Get('test')
  getSmokeTest(): SmokeTestResponse {
    return { status: 'ok' };
  }
}
