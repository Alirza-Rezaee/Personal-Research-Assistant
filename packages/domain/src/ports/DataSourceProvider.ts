import { Result } from "@pra/shared";
import { Paper } from "../entities/Paper.js";

export interface DataSourceQuery {
  keywords: string[];
  maxResults: number;
  sinceDate?: string;
}

export interface DataSourceProvider {
  readonly sourceId: "arxiv" | "semantic_scholar" | "github" | "openalex" | "pubmed" | "crossref";
  search(query: DataSourceQuery): Promise<Result<Paper[], string>>;
  fetchByExternalId(id: string): Promise<Result<Paper | null, string>>;
}