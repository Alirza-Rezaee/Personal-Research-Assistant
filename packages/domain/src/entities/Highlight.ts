import { ISODateString } from "@pra/shared";

// Stored relative to PDF coordinate space (0..1), NOT pixel space,
// so zoom/resize never invalidates a highlight. See ADR-008.
export interface PdfRect {
  page: number;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export type HighlightColor = "yellow" | "green" | "blue" | "pink";

export interface HighlightProps {
  id: string;
  paperId: string;
  rects: PdfRect[];
  text: string;
  color: HighlightColor;
  note?: string;
  createdAt: ISODateString;
}

export class Highlight {
  private constructor(private props: HighlightProps) {}

  static create(props: HighlightProps): Highlight {
    return new Highlight(props);
  }

  attachNote(note: string): void {
    this.props.note = note;
  }

  toProps(): Readonly<HighlightProps> {
    return { ...this.props };
  }
}