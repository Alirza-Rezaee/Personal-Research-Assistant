import { Result } from "@pra/shared";

export interface LLMMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface LLMCompletionRequest {
  messages: LLMMessage[];
  maxTokens?: number;
  temperature?: number;
}

export interface LLMProvider {
  readonly providerId: string; // "openai" | "anthropic" | "ollama" | ...
  complete(request: LLMCompletionRequest): Promise<Result<string, string>>;
  completeStream(
    request: LLMCompletionRequest,
    onChunk: (text: string) => void
  ): Promise<Result<void, string>>;
  embed(text: string): Promise<Result<number[], string>>;
}