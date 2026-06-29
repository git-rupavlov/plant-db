# Plant DB

Remote plant reference database for vegetative-period and phenology modeling.

The database lives in GitHub. The user runs the UI locally. The UI fetches data from GitHub at runtime.

No local SQLite requirement. No repo clone requirement. No pretending every user wants to babysit a database file, because apparently we are trying to reduce suffering.

## Core principle

```text
GitHub repository = source of truth
Local UI          = viewer / explorer / visualizer
Local storage     = optional cache only, never authority
```

## Initial crop

- `Cucurbita moschata` - тиква цигулка / butternut squash

## Repository structure

```text
plants/
  cucurbita_moschata.yaml          # editable source data
locations/
  sofia_bg.yaml                    # editable source location data
public-data/
  index.json                       # UI entry point
  plants/cucurbita_moschata.json   # UI-ready plant data
  locations/sofia_bg.json          # UI-ready location data
docs/
  remote-git-data-architecture.md
  visualization.md
examples/
  remote-client.js
scripts/
  plot_phenology.py
schema.sql                         # optional relational reference model
```

## UI read path

The local UI should start here:

```text
https://raw.githubusercontent.com/git-rupavlov/plant-db/main/public-data/index.json
```

Then load individual records from:

```text
https://raw.githubusercontent.com/git-rupavlov/plant-db/main/public-data/plants/<species_id>.json
https://raw.githubusercontent.com/git-rupavlov/plant-db/main/public-data/locations/<location_id>.json
```

## Runtime model

```text
Local UI
  -> fetch GitHub JSON
  -> parse in memory
  -> render cards / tables / timelines / charts
```

## Data model

```text
species ideal biology
        +
cultivar overrides
        +
location climate
        +
local terrain / microclimate modifiers
        +
weather observations
        =
adapted phenology prediction
```

## Planned visualizations

- Phenology timeline
- Temperature suitability chart
- Stress impact badges / bars
- Local season window overlay
- GDD progress bar

## Planned crops

- Tomato / `Solanum lycopersicum`
- Bean / `Phaseolus vulgaris`
- Amaranth / `Amaranthus spp.`
- Pea / `Pisum sativum`
- Zucchini / `Cucurbita pepo`
