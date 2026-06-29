import { useEffect, useMemo, useState } from "react";
import { loadClimate, loadIndex, loadPlant } from "./api/plantDbClient";
import { PhenologyTimeline } from "./components/PhenologyTimeline";
import { TemperatureChart } from "./components/TemperatureChart";
import { ClimateOverlayChart } from "./components/ClimateOverlayChart";
import { LifecycleDiagram } from "./components/LifecycleDiagram";
import type { ClimateProfile, PlantDbIndex, PlantRecord } from "./types";
import "./styles.css";

export function App() {
  const [index, setIndex] = useState<PlantDbIndex | null>(null);
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [plant, setPlant] = useState<PlantRecord | null>(null);
  const [climate, setClimate] = useState<ClimateProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIndex()
      .then((data) => {
        setIndex(data);
        setSelectedSpeciesId(data.species[0]?.id ?? null);
        setSelectedLocationId(data.locations[0]?.id ?? null);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedSpeciesId) return;
    setLoading(true);
    loadPlant(selectedSpeciesId)
      .then(setPlant)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedSpeciesId]);

  const selectedSummary = useMemo(
    () => index?.species.find((item) => item.id === selectedSpeciesId),
    [index, selectedSpeciesId]
  );

  const selectedLocation = useMemo(
    () => index?.locations.find((item) => item.id === selectedLocationId),
    [index, selectedLocationId]
  );

  useEffect(() => {
    if (!selectedLocation?.climate_url) return;
    loadClimate(selectedLocation.climate_url)
      .then(setClimate)
      .catch((err: Error) => setError(err.message));
  }, [selectedLocation?.climate_url]);

  return (
    <main className="shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Remote Git data • local Linux UI</p>
          <h1>Plant DB</h1>
          <p className="subtitle">
            Local visual explorer for plant phenology, ideal conditions and climate adaptation.
            Data is fetched live from GitHub JSON, because apparently even vegetables need an API contract now.
          </p>
        </div>
        <div className="status-card">
          <span>Dataset</span>
          <strong>{index?.version ?? "loading"}</strong>
        </div>
      </header>

      {error && <section className="error">{error}</section>}

      <section className="layout">
        <aside className="sidebar">
          <h2>Species</h2>
          {index?.species.map((species) => (
            <button
              key={species.id}
              className={species.id === selectedSpeciesId ? "species-button active" : "species-button"}
              onClick={() => setSelectedSpeciesId(species.id)}
            >
              <strong>{species.common_name_bg}</strong>
              <span>{species.latin_name}</span>
            </button>
          ))}

          <h2 className="sidebar-section">Climate</h2>
          {index?.locations.map((location) => (
            <button
              key={location.id}
              className={location.id === selectedLocationId ? "species-button active" : "species-button"}
              onClick={() => setSelectedLocationId(location.id)}
            >
              <strong>{location.name}</strong>
              <span>{location.country}</span>
            </button>
          ))}
        </aside>

        <section className="content">
          {loading && <div className="card">Loading remote GitHub data...</div>}

          {!loading && plant && (
            <>
              <article className="card plant-header">
                <div>
                  <p className="eyebrow">{plant.species.family}</p>
                  <h2>{plant.species.common_name_bg}</h2>
                  <p className="latin">{plant.species.latin_name}</p>
                  <p>{plant.species.notes}</p>
                </div>
                <div className="facts">
                  <span>Lifecycle: {plant.species.life_cycle}</span>
                  <span>Type: {plant.species.plant_type}</span>
                  <span>Plant source: {selectedSummary?.data_url}</span>
                  <span>Climate: {selectedLocation?.name ?? "not selected"}</span>
                </div>
              </article>

              <article className="card">
                <PhenologyTimeline stages={plant.phenology} />
              </article>

              <article className="card">
                <TemperatureChart plant={plant} />
              </article>

              {climate && (
                <article className="card">
                  <ClimateOverlayChart climate={climate} plant={plant} />
                </article>
              )}

              <article className="card">
                <h2>Lifecycle diagram</h2>
                <LifecycleDiagram />
              </article>

              <article className="card grid-card">
                <section>
                  <h2>Cultivars</h2>
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Maturity</th>
                          <th>Fruit kg</th>
                          <th>Fruits/plant</th>
                        </tr>
                      </thead>
                      <tbody>
                        {plant.cultivars.map((cultivar) => (
                          <tr key={cultivar.id}>
                            <td>{cultivar.cultivar_name}</td>
                            <td>{cultivar.maturity_days_min}-{cultivar.maturity_days_max} d</td>
                            <td>{cultivar.average_fruit_weight_kg ?? "-"}</td>
                            <td>{cultivar.fruits_per_plant_min}-{cultivar.fruits_per_plant_max}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section>
                  <h2>Stress responses</h2>
                  <div className="stress-list">
                    {plant.stress_responses.map((stress) => (
                      <div className="stress" key={stress.stress_key}>
                        <strong>{stress.stress_key}</strong>
                        <span>{stress.condition_description}</span>
                        <small>{stress.notes}</small>
                      </div>
                    ))}
                  </div>
                </section>
              </article>
            </>
          )}
        </section>
      </section>
    </main>
  );
}
