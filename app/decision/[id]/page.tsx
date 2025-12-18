"use client";

import { useParams } from "next/navigation";
import { useDecision } from "@/lib/useDecision";

import OptionsEditor from "@/components/OptionsEditor";
import FactorsEditor from "@/components/FactorsEditor";
import ScoringGrid from "@/components/ScoringGrid";
import Results from "@/components/Results";
import Reflection from "@/components/Reflection";

import InvestmentComparisonTable from "@/components/investments/InvestmentComparisonTable";
import InvestmentVerdict from "@/components/investments/InvestmentVerdict";

export default function DecisionPage() {
  const { id } = useParams();
  const { decision, update } = useDecision(id as string);

  if (!decision) {
    return <p className="container">Decision not found</p>;
  }

  return (
    <main className="container">
      {/* ===== Title ===== */}
      <header style={{ marginBottom: "24px" }}>
        <h2>{decision.title}</h2>
        <p style={{ color: "#666" }}>
          Adjust inputs below to explore how different factors
          influence this decision.
        </p>
      </header>

      {/* ===== Step 1: Define choices ===== */}
      <section>
        <h3>Choices</h3>
        <OptionsEditor
          options={decision.options}
          onChange={(o) => update({ options: o })}
        />
      </section>

      {/* ===== Step 2: What matters ===== */}
      <section>
        <h3>What matters to you</h3>
        <FactorsEditor
          factors={decision.factors}
          onChange={(f) => update({ factors: f })}
        />
      </section>

      {/* ===== Step 3: Compare impact ===== */}
      <section>
        <h3>Compare impact</h3>
        <ScoringGrid
          options={decision.options}
          factors={decision.factors}
          scores={decision.scores}
          onChange={(s) => update({ scores: s })}
        />
      </section>

      {/* ===== Step 4: Results ===== */}
      <section>
        <Results decision={decision} />
      </section>

      {/* ===== Step 5: Recommendation ===== */}
      <InvestmentVerdict decision={decision} />

      {/* ===== Step 6: Investment context ===== */}
      <section>
        <h3>Investment comparison</h3>
        <p style={{ color: "#666", marginBottom: "8px" }}>
          A high-level comparison of common investment options
          for additional context.
        </p>

        <InvestmentComparisonTable
          options={[
            {
              id: "equity",
              name: "Equity ETF",
              expectedReturn: 10,
              risk: "High",
              liquidity: "High",
              horizon: "7–10 years",
              income: "Low",
              taxEfficiency: "High",
            },
            {
              id: "fd",
              name: "Fixed Deposit",
              expectedReturn: 6,
              risk: "Low",
              liquidity: "Medium",
              horizon: "1–3 years",
              income: "High",
              taxEfficiency: "Low",
            },
            {
              id: "bonds",
              name: "Bonds",
              expectedReturn: 5,
              risk: "Low",
              liquidity: "High",
              horizon: "3–5 years",
              income: "Medium",
              taxEfficiency: "Medium",
            },
          ]}
        />
      </section>

      {/* ===== Step 7: Reflection ===== */}
      <section>
        <Reflection
          value={decision.reflection ?? ""}
          onChange={(text) => update({ reflection: text })}
        />
      </section>
    </main>
  );
}
