import { Result, ok, err } from "@pra/shared";

const DOI_REGEX = /^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i;

export class DOI {
  private constructor(private readonly value: string) {}

  static create(raw: string): Result<DOI, string> {
    const cleaned = raw.trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, "");
    if (!DOI_REGEX.test(cleaned)) {
      return err(`invalid DOI format: ${raw}`);
    }
    return ok(new DOI(cleaned));
  }

  toString(): string {
    return this.value;
  }

  equals(other: DOI): boolean {
    return this.value.toLowerCase() === other.value.toLowerCase();
  }
}