-- Plant Vegetative Period Database
-- Model:
-- 1. ideal species biology
-- 2. cultivar overrides
-- 3. location climate and terrain
-- 4. later weather observations and prediction logic

CREATE TABLE species (
    id TEXT PRIMARY KEY,
    latin_name TEXT NOT NULL,
    common_name_bg TEXT NOT NULL,
    common_name_en TEXT,
    family TEXT,
    life_cycle TEXT,
    plant_type TEXT,
    notes TEXT
);

CREATE TABLE ideal_conditions (
    species_id TEXT PRIMARY KEY,
    germination_soil_temp_min_c REAL,
    germination_soil_temp_opt_min_c REAL,
    germination_soil_temp_opt_max_c REAL,
    germination_soil_temp_max_c REAL,
    emergence_days_min INTEGER,
    emergence_days_max INTEGER,
    vegetative_day_temp_min_c REAL,
    vegetative_day_temp_max_c REAL,
    vegetative_night_temp_min_c REAL,
    vegetative_night_temp_max_c REAL,
    flowering_temp_min_c REAL,
    flowering_temp_max_c REAL,
    fruiting_temp_min_c REAL,
    fruiting_temp_max_c REAL,
    sunlight_min_hours REAL,
    sunlight_opt_hours REAL,
    ph_min REAL,
    ph_max REAL,
    FOREIGN KEY(species_id) REFERENCES species(id)
);

CREATE TABLE phenology_stages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    species_id TEXT NOT NULL,
    stage_key TEXT NOT NULL,
    stage_name_bg TEXT NOT NULL,
    days_after_emergence_min INTEGER,
    days_after_emergence_max INTEGER,
    gdd_base_c REAL,
    gdd_min REAL,
    gdd_max REAL,
    notes TEXT,
    FOREIGN KEY(species_id) REFERENCES species(id)
);

CREATE TABLE stress_responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    species_id TEXT NOT NULL,
    stress_key TEXT NOT NULL,
    condition_description TEXT,
    effect_growth_percent REAL,
    effect_days_delay_min INTEGER,
    effect_days_delay_max INTEGER,
    notes TEXT,
    FOREIGN KEY(species_id) REFERENCES species(id)
);

CREATE TABLE cultivars (
    id TEXT PRIMARY KEY,
    species_id TEXT NOT NULL,
    cultivar_name TEXT NOT NULL,
    maturity_days_min INTEGER,
    maturity_days_max INTEGER,
    average_fruit_weight_kg REAL,
    fruits_per_plant_min INTEGER,
    fruits_per_plant_max INTEGER,
    storage_months_min INTEGER,
    storage_months_max INTEGER,
    notes TEXT,
    FOREIGN KEY(species_id) REFERENCES species(id)
);

CREATE TABLE locations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT,
    region TEXT,
    latitude REAL,
    longitude REAL,
    elevation_m REAL,
    koppen TEXT,
    usda_zone TEXT,
    avg_last_frost TEXT,
    avg_first_frost TEXT,
    notes TEXT
);

CREATE TABLE local_modifiers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location_id TEXT NOT NULL,
    modifier_key TEXT NOT NULL,
    description TEXT,
    expected_effect TEXT,
    FOREIGN KEY(location_id) REFERENCES locations(id)
);
