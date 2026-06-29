import type { ClimateProfile, PlantDbIndex, PlantRecord } from "../types";

const BASE_URL = "https://raw.githubusercontent.com/git-rupavlov/plant-db/main/public-data";

async function fetchJson<T>(path: string): Promise<T> {
  const normalizedPath = path.replace(/^public-data\//, "");
  const url = `${BASE_URL}/${normalizedPath}`;
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export function loadIndex(): Promise<PlantDbIndex> {
  return fetchJson<PlantDbIndex>("index.json");
}

export function loadPlant(speciesId: string): Promise<PlantRecord> {
  return fetchJson<PlantRecord>(`plants/${speciesId}.json`);
}

export function loadClimate(path: string): Promise<ClimateProfile> {
  return fetchJson<ClimateProfile>(path);
}
