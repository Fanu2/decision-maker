"use client";

import { Option, Factor } from "@/lib/models";

type Props = {
  options: Option[];
  factors: Factor[];
  scores: Record<string, Record<string, number>>;
  onChange: (scores: Record<string, Record<string, number>>) => void;
};

export default function ScoringGrid({
  options,
  factors,
  scores,
  onChange,
}: Props) {
  function updateScore(
    optionId: string,
    factorId: string,
    value: number
  ) {
    onChange({
      ...scores,
      [optionId]: {
        ...scores[optionId],
        [factorId]: value,
      },
    });
  }

  return (
    <section>
      <h3>Scoring</h3>

      {options.map((o) => (
        <div key={o.id} style={{ marginBottom: "12px" }}>
          <strong>{o.name}</strong>

          {factors.map((f) => (
            <div key={f.id} style={{ marginLeft: "12px" }}>
              {f.name}:{" "}
              <input
                type="number"
                min={0}
                max={10}
                value={scores[o.id]?.[f.id] ?? 0}
                onChange={(e) =>
                  updateScore(
                    o.id,
                    f.id,
                    Number(e.target.value)
                  )
                }
                style={{ width: "60px" }}
              />
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
