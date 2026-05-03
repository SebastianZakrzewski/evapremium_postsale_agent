import { Injectable } from '@nestjs/common';
import { createAgent as createLangChainAgent } from 'langchain';
import type { AgentCreateConfig } from '../models/agent-create-config';
import type { ChatResponse } from '../models/chat-response';
import type { RunAgentInput } from '../models/run-agent-input';

type LangChainAgent = ReturnType<typeof createLangChainAgent>;

/** Orchestrates LangChain agent runs (model, tools, prompts); implementation added when integrating. */
@Injectable()
export class AgentOrchestrationService {
  private singletonAgent: LangChainAgent | undefined;

  /**
   * Returns the shared LangChain agent graph; builds it once from {@link AgentCreateConfig}.
   * Further calls ignore `config` and return the same instance (first configuration wins).
   */
  createAgent(config: AgentCreateConfig): LangChainAgent {
    if (this.singletonAgent !== undefined) {
      return this.singletonAgent;
    }
    this.singletonAgent = createLangChainAgent(config);
    return this.singletonAgent;
  }

  /**
   * Runs one agent turn for the given chat input; wire LangChain graph and tools here.
   */
  async runAgent(input: RunAgentInput): Promise<ChatResponse> {
    throw new Error('AgentOrchestrationService.runAgent is not implemented yet.');
  }
}
