import { Result, ok, err } from "@pra/shared";

const ARXIV_REGEX = /^\d{4}\.\d{4,5}(v\d+)?$/;

export class ArxivId {
  private constructor(private readonly value: string) {}

  static create(raw: string): Result<ArxivId, string> {
    const cleaned = raw.trim().replace(/^arxiv:/i, "");
    if (!ARXIV_REGEX.test(cleaned)) {
      return err(`invalid arXiv id format: ${raw}`);
    }
    return ok(new ArxivId(cleaned));
  }

  toString(): string {
    return this.value;
  }
}