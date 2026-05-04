import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import type { SmokeTestResponse } from '../models/smoke-test.response';
import { ChatRequestDto } from './models/chat-request.dto';
import type { ChatResponse } from './models/chat-response';
import type { RunAgentInput } from './models/run-agent-input';
import { AgentOrchestrationService } from './services/agent-orchestration.service';

/** HTTP surface for the postsale agent; keep handlers thin and delegate to services. */
@Controller('agent')
export class AgentController {
  private readonly logger = new Logger(AgentController.name);

  constructor(private readonly agentOrchestrationService: AgentOrchestrationService) {}

  @Get('test')
  getSmokeTest(): SmokeTestResponse {
    return { status: 'ok' };
  }

  @Post('chat')
  async runChat(@Body() dto: ChatRequestDto): Promise<ChatResponse> {
    const sessionLabel = dto.sessionId ?? 'none';
    this.logger.log(
      `Chat request sessionId=${sessionLabel} messageLength=${dto.message.length}`,
    );
    const input: RunAgentInput = {
      message: dto.message,
      sessionId: dto.sessionId,
    };
    const response = await this.agentOrchestrationService.runAgent(input);
    this.logger.log(
      `Chat response sessionId=${sessionLabel} replyLength=${response.reply.length}`,
    );
    return response;
  }
}
