# Growth-stage based model

The old `ideal_conditions` object is too coarse.

A plant does not have one ideal temperature, one ideal water demand, or one ideal light need. Each growth stage has its own biology. Shocking revelation: plants are not static config files.

## New principle

```text
species
  -> growth stage
     -> stage-specific needs
        -> climate / terrain comparison
           -> suitability score
```

## Why this matters

The same month can be excellent for one stage and bad for another.

Example for pumpkin:

- July may be excellent for vegetative growth and fruit expansion.
- July may be too hot or dry for pollination.
- September may be acceptable for fruit maturity but weak for starting a new plant.

So the UI must not ask:

```text
Is this month good for pumpkin?
```

It should ask:

```text
Is this month good for pumpkin at this stage?
```

## Recommended JSON shape

```json
{
  "growth_stages": [
    {
      "stage_key": "germination",
      "stage_name_bg": "Покълване",
      "stage_type": "start",
      "days_after_emergence_min": -7,
      "days_after_emergence_max": 0,
      "requirements": {
        "soil_temp_c": { "min": 16, "optimum_min": 25, "optimum_max": 30, "max": 35 },
        "air_temp_c": { "min": 18, "optimum_min": 24, "optimum_max": 30, "max": 35 },
        "sunlight_hours": { "min": 0, "optimum_min": 0, "optimum_max": 12 },
        "soil_moisture": "even_moist"
      },
      "limiting_factors": ["cold_soil", "waterlogging", "frost"]
    }
  ]
}
```

## Stage categories

Recommended common stage keys:

```text
germination
seedling
vegetative_growth
branching_or_vining
flowering
pollination
fruit_set
fruit_growth
fruit_maturity
seed_maturity
senescence
```

Not every plant needs every stage. Leaf crops, legumes, root crops and fruiting crops will differ.

## UI logic

The UI should calculate a separate monthly score for each stage:

```text
month climate
  +
stage requirements
  +
local modifier
  =
stage suitability
```

Then show:

1. Monthly climate graph
2. Stage suitability heatmap
3. Limiting factor table
4. Suggested sowing / transplant / harvest windows

## Visual examples

### Stage heatmap

```text
              Mar Apr May Jun Jul Aug Sep Oct
Germination     0  35  80  95  95  95  70  20
Seedling        0  30  75  95  90  85  65  20
Flowering       0  10  55  90  85  75  55  10
Fruit growth    0   0  40  85  95  90  60  20
Seed maturity   0   0  20  60  85  90  70  30
```

### Limiting factor table

```text
Month  Stage        Score  Limiting factor
Apr    Germination  35     cold soil / frost
Jun    Flowering    90     none
Aug    Pollination  75     heat / drought
Oct    Fruit growth 20     cold / frost risk
```

## Migration rule

Keep `ideal_conditions` temporarily for backward compatibility.

New UI should prefer:

```text
growth_stages[].requirements
```

Fallback to:

```text
ideal_conditions
```

This prevents older records from breaking while the database evolves. Astonishingly, not breaking your own app is considered good engineering.
