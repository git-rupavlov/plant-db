# Plant DB

Vegetative-period plant database built around one sane principle:

1. Store **ideal biological conditions** for each species.
2. Store **cultivar overrides** separately.
3. Store **location / climate / terrain** separately.
4. Adapt growth periods dynamically from local climate and observations.

Because plants, in their endless botanical arrogance, refuse to obey one universal calendar.

## Initial crop

- `Cucurbita moschata` - тиква цигулка / butternut squash

## Structure

```text
schema.sql
plants/
  cucurbita_moschata.yaml
locations/
  sofia_bg.yaml
scripts/
  load_yaml_to_sqlite.py
```

## Core model

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

## Planned crops

- Tomato / `Solanum lycopersicum`
- Bean / `Phaseolus vulgaris`
- Amaranth / `Amaranthus spp.`
- Pea / `Pisum sativum`
- Zucchini / `Cucurbita pepo`
