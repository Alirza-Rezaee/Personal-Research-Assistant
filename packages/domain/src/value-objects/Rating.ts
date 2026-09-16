import { Result, ok, err } from "@pra/shared";

export class Rating {
  private constructor(private readonly value: number) {}

  static create(raw: number): Result<Rating, string> {
    if (!Number.isInteger(raw) || raw < 1 || raw > 5) {
      return err(`rating must be an integer between 1 and 5, got ${raw}`);
    }
    return ok(new Rating(raw));
  }

  toNumber(): number {
    return this.value;
  }
}