import { LLMProvider, LLMMessage } from "@pra/domain";
import { Result, ok, err } from "@pra/shared";

export interface StartOnboardingInput {
  userPrompt: string;
  uiLanguage: string;
}

export interface StartOnboardingOutput {
  clarifyingQuestions: string[];
}

const SYSTEM_PROMPT = (lang: string) => `
You are a research-onboarding assistant. Given a user's description of their
research field or project, produce between 3 and 7 clarifying questions that
would help build a durable research profile (scope, depth, preferred sources,
keywords to include/exclude). Respond ONLY with a JSON array of strings, in
language "${lang}", with no preamble or markdown.
`.trim();

export class StartOnboarding {
  constructor(private readonly llm: LLMProvider) {}

  async execute(input: StartOnboardingInput): Promise<Result<StartOnboardingOutput, string>> {
    const messages: LLMMessage[] = [
      { role: "system", content: SYSTEM_PROMPT(input.uiLanguage) },
      { role: "user", content: input.userPrompt }
    ];

    const completion = await this.llm.complete({ messages, temperature: 0.4 });
    if (!completion.ok) {
      return err(`onboarding LLM call failed: ${completion.error}`);
    }

    try {
      const parsed = JSON.parse(completion.value.trim());
      if (!Array.isArray(parsed) || !parsed.every((q) => typeof q === "string")) {
        return err("LLM returned malformed clarifying questions");
      }
      return ok({ clarifyingQuestions: parsed as string[] });
    } catch {
      return err("failed to parse clarifying questions as JSON");
    }
  }
}