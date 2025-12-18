import { Decision } from "./models";

export function calculateResults(decision: Decision) {
  const results: Record<string, number> = {};

  for (const option of decision.options) {
    let total = 0;
    let weightSum = 0;

    for (const factor of decision.factors) {
      const score = decision.scores[option.id]?.[factor.id];
      if (typeof score === "number") {
        total += score * factor.weight;
        weightSum += factor.weight;
      }
    }

    results[option.id] = weightSum ? total / weightSum : 0;
  }

  return results;
}

