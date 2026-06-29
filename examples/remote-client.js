const BASE_URL = "https://raw.githubusercontent.com/git-rupavlov/plant-db/main/public-data";

async function fetchJson(path) {
  const url = `${BASE_URL}/${path}`;
  const response = await fetch(url, {
    headers: {
      "Accept": "application/json"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function loadPlantDbIndex() {
  return fetchJson("index.json");
}

export async function loadSpecies(speciesId) {
  return fetchJson(`plants/${speciesId}.json`);
}

export async function loadLocation(locationId) {
  return fetchJson(`locations/${locationId}.json`);
}

// Minimal manual test:
// node-compatible runtimes need native fetch support or a fetch polyfill.
async function demo() {
  const index = await loadPlantDbIndex();
  console.log(index.dataset, index.version);

  const firstSpeciesId = index.species[0].id;
  const species = await loadSpecies(firstSpeciesId);
  console.log(species.species.latin_name);
  console.table(species.phenology);
}

if (typeof process !== "undefined" && process.argv[1]?.endsWith("remote-client.js")) {
  demo().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
