import { Injectable, OnModuleInit } from '@nestjs/common';
import { createAgent as createLangChainAgent } from 'langchain';
import type { AgentCreateConfig } from '../models/agent-create-config';
import type { ChatResponse } from '../models/chat-response';
import type { RunAgentInput } from '../models/run-agent-input';

const POSTSALE_AGENT_CHAT_MODEL_ENV = 'POSTSALE_AGENT_CHAT_MODEL';
const DEFAULT_POSTSALE_AGENT_CHAT_MODEL = 'openai:gpt-4o-mini';

type LangChainAgent = ReturnType<typeof createLangChainAgent>;

/** Orchestrates LangChain agent runs (model, tools, prompts); implementation added when integrating. */
@Injectable()
export class AgentOrchestrationService implements OnModuleInit {
  private singletonAgent: LangChainAgent | undefined;

  /** Builds the shared agent once when the Nest module initializes. */
  onModuleInit(): void {
    this.createAgent(this.buildStartupAgentConfig());
  }

  private buildStartupAgentConfig(): AgentCreateConfig {
    const model =
      process.env[POSTSALE_AGENT_CHAT_MODEL_ENV] ?? DEFAULT_POSTSALE_AGENT_CHAT_MODEL;
    return {
      model,
      tools: [],
    };
  }

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
