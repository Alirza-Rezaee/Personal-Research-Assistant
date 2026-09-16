import { Result } from "@pra/shared";
import { ResearchProfile } from "../entities/ResearchProfile.js";

export interface ResearchProfileRepository {
  save(profile: ResearchProfile): Promise<Result<void, string>>;
  getActive(): Promise<Result<ResearchProfile | null, string>>;
}