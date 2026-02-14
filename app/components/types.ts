import type { CohortId } from "@/app/data/cohorts";

export type ScholarLink = {
  website: string; // required
  cohort: CohortId; // required

  firstName?: string;
  lastName?: string;

  city: string; // required
  region: string; // required (state/province)
};

export function displayName(link: Pick<ScholarLink, "firstName" | "lastName" | "website">) {
  const full = `${link.firstName ?? ""} ${link.lastName ?? ""}`.trim();
  if (full) return full;

  try {
    return new URL(link.website).host.replace(/^www\./, "");
  } catch {
    return link.website;
  }
}

export function locationLabel(link: Pick<ScholarLink, "city" | "region">) {
  return `${link.city}, ${link.region}`;
}
