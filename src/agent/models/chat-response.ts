/** Plain response payload for a chat completion from the agent. */
export type ChatResponse = Readonly<{
  reply: string;
  sessionId?: string;
}>;
