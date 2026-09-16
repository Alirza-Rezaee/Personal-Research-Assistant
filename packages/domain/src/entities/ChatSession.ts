import { ISODateString } from "@pra/shared";

export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessageProps {
  id: string;
  sessionId: string;
  role: ChatRole;
  content: string;
  contextText?: string; // auto-attached selected PDF text
  pageNumber?: number;
  createdAt: ISODateString;
}

export interface ChatSessionProps {
  id: string;
  paperId: string;
  title: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export class ChatSession {
  private messages: ChatMessageProps[] = [];

  private constructor(private props: ChatSessionProps) {}

  static create(props: ChatSessionProps): ChatSession {
    return new ChatSession(props);
  }

  addMessage(message: ChatMessageProps): void {
    this.messages.push(message);
    this.props.updatedAt = message.createdAt;
  }

  getMessages(): ReadonlyArray<ChatMessageProps> {
    return this.messages;
  }

  toProps(): Readonly<ChatSessionProps> {
    return { ...this.props };
  }
}