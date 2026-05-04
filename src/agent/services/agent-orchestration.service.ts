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
    if (this.singletonAgent === undefined) {
      throw new Error('AgentOrchestrationService.runAgent: agent not initialized');
    }
    const state = await this.singletonAgent.invoke({
      messages: [{ role: 'user', content: input.message }],
    });
    const lastMessage = state.messages.at(-1);
    const rawContent = lastMessage?.content;
    const reply =
      typeof rawContent === 'string'
        ? rawContent
        : Array.isArray(rawContent)
          ? rawContent
              .map((part: { type?: string; text?: string }) =>
                part && typeof part === 'object' && part.type === 'text' && typeof part.text === 'string'
                  ? part.text
                  : '',
              )
              .join('')
          : '';
    return {
      reply,
      sessionId: input.sessionId,
    };
  }
}
