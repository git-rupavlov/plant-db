export interface PlantDbIndex {
  dataset: string;
  version: string;
  source_repo: string;
  source_branch: string;
  species: SpeciesSummary[];
  locations: LocationSummary[];
}

export interface SpeciesSummary {
  id: string;
  latin_name: string;
  common_name_bg: string;
  common_name_en?: string;
  data_url: string;
}

export interface LocationSummary {
  id: string;
  name: string;
  country: string;
  data_url: string;
  climate_url?: string;
}

export interface ClimateProfile {
  id: string;
  location_id: string;
  label: string;
  units: {
    temperature: string;
    precipitation: string;
    sun_hours: string;
    gdd_base10: string;
  };
  months: MonthlyClimate[];
}

export interface MonthlyClimate {
  month: number;
  label: string;
  avg_min_c: number;
  avg_mean_c: number;
  avg_max_c: number;
  precip_mm: number;
  frost_level: number;
  sun_hours: number;
  gdd_base10: number;
}

export interface PlantRecord {
  species: {
    id: string;
    latin_name: string;
    common_name_bg: string;
    common_name_en?: string;
    family?: string;
    life_cycle?: string;
    plant_type?: string;
    notes?: string;
  };
  ideal_conditions: IdealConditions;
  growth_stages?: GrowthStage[];
  phenology: PhenologyStage[];
  stress_responses: StressResponse[];
  cultivars: Cultivar[];
}

export interface GrowthStage {
  stage_key: string;
  stage_name_bg: string;
  stage_type?: string;
  days_after_emergence_min: number;
  days_after_emergence_max: number;
  requirements: StageRequirements;
  limiting_factors?: string[];
}

export interface StageRequirements {
  air_temp_c?: RangeWithOptimum;
  soil_temp_c?: RangeWithOptimum;
  sunlight_hours?: {
    min: number;
    optimum_min: number;
    optimum_max: number;
  };
  humidity_percent?: RangeWithOptimum;
  soil_moisture_percent?: RangeWithOptimum;
  water_need?: string;
  nutrient_need?: string;
  pollinator_activity?: string;
}

export interface IdealConditions {
  germination?: {
    soil_temp_c?: RangeWithOptimum;
    emergence_days?: MinMax;
  };
  vegetative_growth?: {
    day_temp_c?: MinMax;
    night_temp_c?: MinMax;
  };
  flowering?: {
    optimum_temp_c?: MinMax;
  };
  fruiting?: {
    optimum_temp_c?: MinMax;
  };
  light?: {
    sunlight_min_hours?: number;
    sunlight_opt_hours?: number;
  };
  soil?: {
    ph_min?: number;
    ph_max?: number;
    drainage?: string;
    fertility?: string;
  };
}

export interface MinMax {
  min: number;
  max: number;
}

export interface RangeWithOptimum {
  min: number;
  optimum_min: number;
  optimum_max: number;
  max: number;
}

export interface PhenologyStage {
  stage_key: string;
  stage_name_bg: string;
  days_after_emergence_min: number;
  days_after_emergence_max: number;
  notes?: string;
}

export interface StressResponse {
  stress_key: string;
  condition_description: string;
  effect_growth_percent?: number;
  effect_days_delay_min?: number;
  effect_days_delay_max?: number;
  notes?: string;
}

export interface Cultivar {
  id: string;
  cultivar_name: string;
  maturity_days_min?: number;
  maturity_days_max?: number;
  average_fruit_weight_kg?: number;
  fruits_per_plant_min?: number;
  fruits_per_plant_max?: number;
  storage_months_min?: number;
  storage_months_max?: number;
}
