"use client";

type InvestmentOption = {
  id: string;
  name: string;
  expectedReturn: number; // %
  risk: "Low" | "Medium" | "High";
  liquidity: "Low" | "Medium" | "High";
  horizon: string;
  income: "Low" | "Medium" | "High";
  taxEfficiency: "Low" | "Medium" | "High";
};

type Props = {
  options: InvestmentOption[];
};

export default function InvestmentComparisonTable({ options }: Props) {
  return (
    <section>
      <h3>Investment Comparison</h3>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "12px",
        }}
      >
        <thead>
          <tr>
            <th style={th}>Metric</th>
            {options.map((o) => (
              <th key={o.id} style={th}>
                {o.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <Row label="Expected Return">
            {options.map((o) => (
              <Cell key={o.id}>{o.expectedReturn}%</Cell>
            ))}
          </Row>

          <Row label="Risk">
            {options.map((o) => (
              <Cell key={o.id}>{o.risk}</Cell>
            ))}
          </Row>

          <Row label="Liquidity">
            {options.map((o) => (
              <Cell key={o.id}>{o.liquidity}</Cell>
            ))}
          </Row>

          <Row label="Time Horizon">
            {options.map((o) => (
              <Cell key={o.id}>{o.horizon}</Cell>
            ))}
          </Row>

          <Row label="Income Stability">
            {options.map((o) => (
              <Cell key={o.id}>{o.income}</Cell>
            ))}
          </Row>

          <Row label="Tax Efficiency">
            {options.map((o) => (
              <Cell key={o.id}>{o.taxEfficiency}</Cell>
            ))}
          </Row>
        </tbody>
      </table>
    </section>
  );
}

/* ---------- helpers ---------- */

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <tr>
      <td style={tdLabel}>{label}</td>
      {children}
    </tr>
  );
}

function Cell({ children }: { children: React.ReactNode }) {
  return <td style={td}>{children}</td>;
}

const th: React.CSSProperties = {
  borderBottom: "1px solid #ccc",
  padding: "8px",
  textAlign: "center",
  fontWeight: 600,
};

const td: React.CSSProperties = {
  borderBottom: "1px solid #eee",
  padding: "8px",
  textAlign: "center",
};

const tdLabel: React.CSSProperties = {
  ...td,
  fontWeight: 500,
  textAlign: "left",
};

