"use client";

import { useEffect, useState } from "react";
import { Decision } from "./models";
import { loadDecisions, saveDecision } from "./storage";

export function useDecision(id: string) {
  const [decision, setDecision] = useState<Decision | null>(null);

  useEffect(() => {
    const d = loadDecisions().find(d => d.id === id);
    if (d) setDecision(d);
  }, [id]);

  function update(partial: Partial<Decision>) {
    if (!decision) return;
    const updated = { ...decision, ...partial };
    setDecision(updated);
    saveDecision(updated);
  }

  return { decision, update };
}

