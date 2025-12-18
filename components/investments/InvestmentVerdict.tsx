"use client";

import { Decision } from "@/lib/models";
import { calculateResults } from "@/lib/scoring";

type Props = {
  decision: Decision;
};

export default function InvestmentVerdict({ decision }: Props) {
  const results = calculateResults(decision);

  // Convert to sortable array
  const ranked = Object.entries(results)
    .map(([optionId, score]) => {
      const option = decision.options.find(
        (o) => o.id === optionId
      );
      return {
        optionId,
        name: option?.name ?? "Unknown",
        score,
      };
    })
    .sort((a, b) => b.score - a.score);

  if (ranked.length === 0) return null;

  const top = ranked[0];
  const second = ranked[1];

  const confidence =
    second && top.score > 0
      ? Math.round(((top.score - second.score) / top.score) * 100)
      : 100;

  return (
    <section
      style={{
        border: "1px solid #e5e5e5",
        borderRadius: "8px",
        padding: "16px",
        marginTop: "20px",
        background: "#fafafa",
      }}
    >
      <h3>📌 Recommendation</h3>

      <p style={{ fontSize: "1.1em", marginTop: "8px" }}>
        <strong>{top.name}</strong> fits your preferences best.
      </p>

      <p style={{ color: "#555" }}>
        Confidence level: <strong>{confidence}%</strong>
      </p>

      <WhyText optionName={top.name} />

      <p style={{ marginTop: "12px", fontSize: "0.9em", color: "#777" }}>
        Tip: This recommendation reflects your current inputs.
        Adjust weights or scores to explore alternatives.
      </p>
    </section>
  );
}

/* ---------- explanation logic ---------- */

function WhyText({ optionName }: { optionName: string }) {
  const name = optionName.toLowerCase();

  if (name.includes("fixed") || name.includes("fd")) {
    return (
      <ul>
        <li>Capital protection is prioritized</li>
        <li>Low volatility suits your risk profile</li>
        <li>Short to medium time horizon</li>
      </ul>
    );
  }

  if (name.includes("equity") || name.includes("stock")) {
    return (
      <ul>
        <li>Long-term growth potential is important to you</li>
        <li>You are comfortable with short-term volatility</li>
        <li>Tax efficiency favors equity exposure</li>
      </ul>
    );
  }

  if (name.includes("bond")) {
    return (
      <ul>
        <li>Stable income matters more than growth</li>
        <li>Lower risk preference</li>
        <li>Medium-term investment horizon</li>
      </ul>
    );
  }

  return (
    <ul>
      <li>This option aligns best with your weighted preferences</li>
    </ul>
  );
}

