import { ISODateString } from "@pra/shared";
import { DOI } from "../value-objects/DOI.js";
import { ArxivId } from "../value-objects/ArxivId.js";

export type PaperSourceId =
  | { kind: "doi"; id: DOI }
  | { kind: "arxiv"; id: ArxivId }
  | { kind: "url"; id: string };

export interface PaperProps {
  id: string; // internal UUID, not the external id
  title: string;
  authors: string[];
  abstract: string;
  publishedDate: ISODateString;
  source: "arxiv" | "semantic_scholar" | "github" | "openalex" | "pubmed" | "crossref" | "manual";
  sourceId: PaperSourceId;
  url: string;
  pdfUrl?: string;
  localPdfPath?: string;
  summary?: string;
  relevanceScore?: number; // 0..1, set by RelevanceScorer domain service
  createdAt: ISODateString;
}

export class Paper {
  private constructor(private props: PaperProps) {}

  static create(props: PaperProps): Paper {
    return new Paper(props);
  }

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  attachSummary(summary: string): void {
    this.props.summary = summary;
  }

  attachLocalPdf(path: string): void {
    this.props.localPdfPath = path;
  }

  setRelevanceScore(score: number): void {
    if (score < 0 || score > 1) {
      throw new Error(`relevance score must be in [0,1], got ${score}`);
    }
    this.props.relevanceScore = score;
  }

  toProps(): Readonly<PaperProps> {
    return { ...this.props };
  }
}