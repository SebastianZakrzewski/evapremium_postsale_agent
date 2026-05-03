/** Domain input for one agent turn; map from HTTP DTOs at the controller boundary. */
export type RunAgentInput = Readonly<{
  message: string;
  sessionId?: string;
}>;
