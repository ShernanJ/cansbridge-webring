export const COHORTS = [
  { id: "tazkiyah", name: "Tazkiyah", term: "Winter 2026" },
  { id: "meraki", name: "Meraki", term: "Fall 2025" },
  { id: "invicta", name: "Invicta", term: "Summer 2025" },
  { id: "apeiron", name: "Apeiron", term: "Summer 2025" },
  { id: "arete", name: "Arete", term: "Spring 2025" },
  { id: "kairos", name: "Kairos", term: "Winter 2025" },
  { id: "eunoia", name: "Eunoia", term: "Fall 2024" },
  { id: "exodus", name: "Exodus", term: "Summer 2024" },
  { id: "genesis", name: "Genesis", term: "Spring 2024" },
] as const;

export type CohortId = (typeof COHORTS)[number]["id"];

export function cohortLabel(id: CohortId) {
  const c = COHORTS.find((x) => x.id === id);
  return c ? `${c.name} — ${c.term}` : id;
}
