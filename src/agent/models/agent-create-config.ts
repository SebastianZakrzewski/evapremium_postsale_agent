import type { CreateAgentParams } from 'langchain';

/**
 * Application-level draft config for a LangChain agent runtime.
 * Fields align with {@link CreateAgentParams}: `model`, `tools`, `systemPrompt`, `stateSchema`,
 * `contextSchema`, `checkpointer`, `store`, `responseFormat`, `middleware`, `name`, `description`,
 * `includeAgentName`, `signal`, `version`.
 */
export type AgentCreateConfig = CreateAgentParams;
