# Visualization model

The database should support simple visual checks from day one.
No need for a NASA dashboard while we still have one pumpkin record, because humanity has suffered enough from dashboards.

## Useful graph types

### 1. Phenology timeline

Shows expected development stages through time.

Example for pumpkin:

```text
Day 0      emergence
Day 5-10   first true leaf
Day 20-35  vining start
Day 35-45  first male flowers
Day 45-60  first female flowers
Day 50-70  fruit set
Day 90-120 mature harvest
```

Good for:

- crop planning
- comparing cultivars
- estimating if a crop can finish before first frost

### 2. Temperature suitability chart

Shows minimum, optimum and dangerous temperature ranges.

Good for:

- sowing timing
- greenhouse risk
- heat stress warnings
- germination prediction

### 3. Local adaptation diagram

```text
ideal species biology
        +
cultivar override
        +
location climate
        +
microclimate modifier
        +
weather observations
        =
adapted forecast
```

Good for explaining why the same plant behaves differently on balcony, field, greenhouse or shaded terrain.

### 4. Stress impact chart

Shows estimated effect of drought, shade, cold soil, frost, etc.

Good for:

- risk scoring
- task prioritization
- explaining poor growth

## Minimal visualization stack

Recommended start:

- SQLite for storage
- YAML for editable seed data
- Python + matplotlib for static graphs
- Later: web UI with SVG or Chart.js

## First target charts

1. `phenology_timeline.png`
2. `temperature_suitability.png`
3. `stress_response_bar.png`

## Data requirements

For proper diagrams, each crop should eventually include:

- stage start day min/max
- optional GDD min/max
- temperature min/optimum/max
- sunlight requirement
- frost tolerance
- stress modifiers
- cultivar-specific maturity range

## Future web visualization

Possible frontend components:

- crop card
- timeline bar
- local season window overlay
- frost risk marker
- GDD progress bar
- stress badges

For Nomad Farmer, the same model can be rendered like a Civ-style city growth timeline:

```text
Food/Water   -> vegetative growth
Production   -> tasks / structures
Commerce     -> budget / inputs
Culture      -> biodiversity / soil life
```
