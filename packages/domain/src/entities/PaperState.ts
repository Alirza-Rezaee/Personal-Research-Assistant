import { ISODateString } from "@pra/shared";
import { Rating } from "../value-objects/Rating.js";

export type PaperStateKind = "saved" | "must_read" | "read" | "history" | "disliked";

export interface PaperStateProps {
  paperId: string;
  state: PaperStateKind;
  rating?: Rating;
  note?: string;
  updatedAt: ISODateString;
}

export class PaperState {
  private constructor(private props: PaperStateProps) {}

  static create(props: PaperStateProps): PaperState {
    return new PaperState(props);
  }

  transitionTo(state: PaperStateKind, updatedAt: ISODateString): void {
    this.props.state = state;
    this.props.updatedAt = updatedAt;
  }

  toProps(): Readonly<PaperStateProps> {
    return { ...this.props };
  }
}