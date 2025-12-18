import { Decision } from "./models";

const KEY = "decisions";

export function loadDecisions(): Decision[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function saveDecision(decision: Decision) {
  const all = loadDecisions().filter(d => d.id !== decision.id);
  localStorage.setItem(KEY, JSON.stringify([...all, decision]));
}

