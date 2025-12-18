"use client";

import { Factor } from "@/lib/models";

type Props = {
  factors: Factor[];
  onChange: (factors: Factor[]) => void;
};

export default function FactorsEditor({ factors, onChange }: Props) {
  function updateFactor(id: string, field: "name" | "weight", value: string) {
    onChange(
      factors.map((f) =>
        f.id === id
          ? {
              ...f,
              [field]: field === "weight" ? Number(value) : value,
            }
          : f
      )
    );
  }

  return (
    <section>
      <h3>Factors</h3>

      {factors.map((f) => (
        <div key={f.id} style={{ marginBottom: "8px" }}>
          <input
            value={f.name}
            onChange={(e) => updateFactor(f.id, "name", e.target.value)}
            placeholder="Factor name"
            style={{ marginRight: "8px" }}
          />
          <input
            type="number"
            value={f.weight}
            onChange={(e) => updateFactor(f.id, "weight", e.target.value)}
            style={{ width: "80px" }}
          />
        </div>
      ))}
    </section>
  );
}
