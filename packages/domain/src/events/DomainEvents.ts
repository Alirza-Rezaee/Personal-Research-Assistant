import { ISODateString } from "@pra/shared";

interface BaseEvent {
  occurredAt: ISODateString;
}

export interface PaperSavedEvent extends BaseEvent {
  type: "PaperSaved";
  paperId: string;
}

export interface FeedbackGivenEvent extends BaseEvent {
  type: "FeedbackGiven";
  paperId: string;
  action: "save" | "dislike" | "must_read" | "read" | "rate";
  rating?: number;
}

export interface HighlightCreatedEvent extends BaseEvent {
  type: "HighlightCreated";
  paperId: string;
  highlightId: string;
}

export type DomainEvent = PaperSavedEvent | FeedbackGivenEvent | HighlightCreatedEvent;