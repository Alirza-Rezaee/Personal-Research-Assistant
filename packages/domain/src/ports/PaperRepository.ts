import { Result } from "@pra/shared";
import { Paper } from "../entities/Paper.js";

export interface PaperRepository {
  save(paper: Paper): Promise<Result<void, string>>;
  findById(id: string): Promise<Result<Paper | null, string>>;
  findByDoi(doi: string): Promise<Result<Paper | null, string>>;
  search(query: string, limit: number): Promise<Result<Paper[], string>>;
}