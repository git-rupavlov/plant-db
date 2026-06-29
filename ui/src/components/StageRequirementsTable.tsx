import type { GrowthStage } from "../types";

interface Props {
  stages?: GrowthStage[];
}

function fmtRange(range?: { min: number; optimum_min: number; optimum_max: number; max: number }, unit = "") {
  if (!range) return "-";
  return `${range.optimum_min}-${range.optimum_max}${unit} ideal / ${range.min}-${range.max}${unit} range`;
}

function fmtSun(range?: { min: number; optimum_min: number; optimum_max: number }) {
  if (!range) return "-";
  return `${range.optimum_min}-${range.optimum_max}h ideal / ${range.min}h min`;
}

export function StageRequirementsTable({ stages }: Props) {
  if (!stages?.length) {
    return (
      <div className="empty-note">
        No growth-stage requirements yet. This plant still lives in the old coarse model, because migration is a swamp with labels.
      </div>
    );
  }

  return (
    <div className="stage-table-wrap">
      <table className="stage-table">
        <thead>
          <tr>
            <th>Stage</th>
            <th>Days</th>
            <th>Air temp</th>
            <th>Soil temp</th>
            <th>Sunlight</th>
            <th>Humidity</th>
            <th>Soil moisture</th>
            <th>Water / nutrients</th>
            <th>Limiting factors</th>
          </tr>
        </thead>
        <tbody>
          {stages.map((stage) => (
            <tr key={stage.stage_key}>
              <td>
                <strong>{stage.stage_name_bg}</strong>
                <small>{stage.stage_key}</small>
              </td>
              <td>{stage.days_after_emergence_min} to {stage.days_after_emergence_max}</td>
              <td>{fmtRange(stage.requirements.air_temp_c, "°C")}</td>
              <td>{fmtRange(stage.requirements.soil_temp_c, "°C")}</td>
              <td>{fmtSun(stage.requirements.sunlight_hours)}</td>
              <td>{fmtRange(stage.requirements.humidity_percent, "%")}</td>
              <td>{fmtRange(stage.requirements.soil_moisture_percent, "%")}</td>
              <td>
                <span>{stage.requirements.water_need ?? "-"}</span>
                <small>{stage.requirements.nutrient_need ?? ""}</small>
                <small>{stage.requirements.pollinator_activity ? `pollinators: ${stage.requirements.pollinator_activity}` : ""}</small>
              </td>
              <td>{stage.limiting_factors?.join(", ") ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
