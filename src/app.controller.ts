import { Controller, Get } from '@nestjs/common';
import type { SmokeTestResponse } from './models/smoke-test.response';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('admin/test')
  getSmokeTest(): SmokeTestResponse {
    return this.appService.getSmokeStatus();
  }
}
