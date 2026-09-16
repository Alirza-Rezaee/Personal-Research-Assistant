import { ISODateString } from "@pra/shared";

export type ResearchDepth = "shallow" | "medium" | "deep";

export interface ResearchProfileProps {
  id: string;
  userPrompt: string;
  topics: string[];
  keywords: string[];
  exclusions: string[]; // things the user explicitly does NOT want
  depth: ResearchDepth;
  sources: string[]; // e.g. ["arxiv", "semantic_scholar"]
  language: string; // BCP-47, e.g. "fa"
  createdAt: ISODateString;
}

export class ResearchProfile {
  private constructor(private props: ResearchProfileProps) {}

  static create(props: ResearchProfileProps): ResearchProfile {
    return new ResearchProfile(props);
  }

  refineWithFeedback(positiveKeywords: string[], negativeKeywords: string[]): void {
    const merged = new Set([...this.props.keywords, ...positiveKeywords]);
    for (const neg of negativeKeywords) merged.delete(neg);
    this.props.keywords = [...merged];
  }

  toProps(): Readonly<ResearchProfileProps> {
    return { ...this.props };
  }
}