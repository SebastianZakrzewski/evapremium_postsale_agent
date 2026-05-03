import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

const CHAT_MESSAGE_MAX_LENGTH = 16_000;

/** Validated body for a synchronous chat request to the agent. */
export class ChatRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(CHAT_MESSAGE_MAX_LENGTH)
  readonly message!: string;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  readonly sessionId?: string;
}
