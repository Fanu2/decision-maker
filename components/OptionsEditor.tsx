"use client";

import { Option } from "@/lib/models";

type Props = {
  options: Option[];
  onChange: (options: Option[]) => void;
};

export default function OptionsEditor({ options, onChange }: Props) {
  function updateOption(id: string, name: string) {
    onChange(
      options.map((o) =>
        o.id === id ? { ...o, name } : o
      )
    );
  }

  return (
    <section>
      <h3>Options</h3>

      {options.map((o) => (
        <input
          key={o.id}
          value={o.name}
          onChange={(e) => updateOption(o.id, e.target.value)}
          style={{
            display: "block",
            marginBottom: "8px",
            padding: "6px",
          }}
        />
      ))}
    </section>
  );
}
