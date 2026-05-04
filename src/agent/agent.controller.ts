import { Body, Controller, Get, Post } from '@nestjs/common';
import type { SmokeTestResponse } from '../models/smoke-test.response';
import { ChatRequestDto } from './models/chat-request.dto';
import type { ChatResponse } from './models/chat-response';
import type { RunAgentInput } from './models/run-agent-input';
import { AgentOrchestrationService } from './services/agent-orchestration.service';

/** HTTP surface for the postsale agent; keep handlers thin and delegate to services. */
@Controller('agent')
export class AgentController {
  constructor(private readonly agentOrchestrationService: AgentOrchestrationService) {}

  @Get('test')
  getSmokeTest(): SmokeTestResponse {
    return { status: 'ok' };
  }

  @Post('chat')
  async runChat(@Body() dto: ChatRequestDto): Promise<ChatResponse> {
    const input: RunAgentInput = {
      message: dto.message,
      sessionId: dto.sessionId,
    };
    return this.agentOrchestrationService.runAgent(input);
  }
}
