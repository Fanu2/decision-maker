"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Decision } from "@/lib/models";
import { loadDecisions } from "@/lib/storage";

export default function Home() {
  const [decisions, setDecisions] = useState<Decision[]>([]);

  useEffect(() => {
    setDecisions(loadDecisions());
  }, []);

  return (
    <main
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "40px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>
        Decision Maker
      </h1>

      <p style={{ color: "#555", marginBottom: "24px" }}>
        Think clearly. Decide calmly.
      </p>

      <Link
        href="/decision/new"
        style={{
          display: "inline-block",
          background: "#2563eb",
          color: "#fff",
          padding: "10px 16px",
          borderRadius: "8px",
          textDecoration: "none",
          marginBottom: "32px",
        }}
      >
        + New Decision
      </Link>

      {decisions.length === 0 ? (
        <p style={{ color: "#777", marginTop: "24px" }}>
          No decisions yet. Create your first one.
        </p>
      ) : (
        <ul style={{ marginTop: "24px", paddingLeft: "20px" }}>
          {decisions.map((d) => (
            <li key={d.id} style={{ marginBottom: "12px" }}>
              <Link
                href={`/decision/${d.id}`}
                style={{ color: "#2563eb", textDecoration: "none" }}
              >
                {d.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
