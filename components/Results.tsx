"use client";

import { Decision } from "@/lib/models";
import { calculateResults } from "@/lib/scoring";

type Props = {
  decision: Decision;
};

export default function Results({ decision }: Props) {
  const results = calculateResults(decision);

  // Convert object → array for rendering
  const rows = Object.entries(results).map(
    ([optionId, score]) => {
      const option = decision.options.find(
        (o) => o.id === optionId
      );

      return {
        optionId,
        optionName: option?.name ?? "Unknown",
        score,
      };
    }
  );

  return (
    <section>
      <h3>Results</h3>

      <ul>
        {rows.map((r) => (
          <li key={r.optionId}>
            <strong>{r.optionName}</strong>:{" "}
            {r.score.toFixed(2)}
          </li>
        ))}
      </ul>
    </section>
  );
}
