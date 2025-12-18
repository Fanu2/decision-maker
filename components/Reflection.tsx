"use client";

type Props = {
  value?: string;
  onChange: (value: string) => void;
};

export default function Reflection({ value = "", onChange }: Props) {
  return (
    <section>
      <h3>Reflection</h3>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What did you learn from this decision?"
        rows={4}
        style={{ width: "100%", padding: "8px" }}
      />
    </section>
  );
}
