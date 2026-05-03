import { Injectable } from '@nestjs/common';
import type { ChatResponse } from '../models/chat-response';
import type { RunAgentInput } from '../models/run-agent-input';

/** Orchestrates LangChain agent runs (model, tools, prompts); implementation added when integrating. */
@Injectable()
export class AgentOrchestrationService {
  /**
   * Runs one agent turn for the given chat input; wire LangChain graph and tools here.
   */
  async runAgent(input: RunAgentInput): Promise<ChatResponse> {
    throw new Error('AgentOrchestrationService.runAgent is not implemented yet.');
  }
}
