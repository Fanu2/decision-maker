"use client";

import { useRouter } from "next/navigation";
import { saveDecision } from "@/lib/storage";
import TemplatePicker from "@/components/TemplatePicker";
import { templates } from "@/lib/templates";

/**
 * Safe ID generator for client-side usage
 */
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function NewDecision() {
  const router = useRouter();

  function applyTemplate(id: string) {
    const t = templates.find((t) => t.id === id);
    if (!t) return;

    const decision = {
      id: generateId(),
      title: t.title,
      description: t.description,
      createdAt: Date.now(),
      options: t.options.map((o) => ({
        id: generateId(),
        name: o.name,
      })),
      factors: t.factors.map((f) => ({
        id: generateId(),
        name: f.name,
        weight: f.weight,
      })),
      scores: {},
    };

    saveDecision(decision);
    router.push(`/decision/${decision.id}`);
  }

  return (
    <main className="container">
      <TemplatePicker onSelect={applyTemplate} />
    </main>
  );
}
