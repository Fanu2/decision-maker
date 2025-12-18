"use client";

import { templates } from "@/lib/templates";

type Props = {
  onSelect: (id: string) => void;
};

export default function TemplatePicker({ onSelect }: Props) {
  return (
    <section style={{ marginBottom: "32px" }}>
      <h2 style={{ marginBottom: "12px" }}>Start from a template</h2>

      <div style={{ display: "grid", gap: "12px" }}>
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            style={{
              textAlign: "left",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            <strong>{t.title}</strong>
            <p style={{ margin: "6px 0 0", color: "#555" }}>
              {t.description}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
