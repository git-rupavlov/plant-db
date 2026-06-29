#!/usr/bin/env python3
"""Create a simple phenology timeline chart from a plant YAML file.

Usage:
    python scripts/plot_phenology.py plants/cucurbita_moschata.yaml

Output:
    output/phenology_cucurbita_moschata.png
"""

from __future__ import annotations

import sys
from pathlib import Path

try:
    import yaml
except ImportError as exc:
    raise SystemExit("Missing dependency: PyYAML. Install with: pip install pyyaml") from exc

try:
    import matplotlib.pyplot as plt
except ImportError as exc:
    raise SystemExit("Missing dependency: matplotlib. Install with: pip install matplotlib") from exc


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output"


def load_yaml(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as fh:
        return yaml.safe_load(fh)


def plot_phenology(path: Path) -> Path:
    data = load_yaml(path)
    species = data["species"]
    stages = data.get("phenology", [])

    if not stages:
        raise SystemExit(f"No phenology stages found in {path}")

    labels = []
    starts = []
    widths = []

    for stage in stages:
        start = stage.get("days_after_emergence_min")
        end = stage.get("days_after_emergence_max")

        if start is None or end is None:
            continue

        labels.append(stage["stage_name_bg"])
        starts.append(start)
        widths.append(max(end - start, 1))

    fig, ax = plt.subplots(figsize=(10, 5))
    y_positions = range(len(labels))

    ax.barh(y_positions, widths, left=starts)
    ax.set_yticks(list(y_positions))
    ax.set_yticklabels(labels)
    ax.invert_yaxis()
    ax.set_xlabel("Days after emergence")
    ax.set_title(f"Phenology timeline: {species['latin_name']} / {species['common_name_bg']}")
    ax.grid(axis="x", linestyle="--", alpha=0.4)

    OUTPUT_DIR.mkdir(exist_ok=True)
    out_path = OUTPUT_DIR / f"phenology_{species['id']}.png"
    fig.tight_layout()
    fig.savefig(out_path, dpi=150)
    plt.close(fig)

    return out_path


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python scripts/plot_phenology.py plants/cucurbita_moschata.yaml")

    path = Path(sys.argv[1])
    if not path.is_absolute():
        path = ROOT / path

    out_path = plot_phenology(path)
    print(out_path)


if __name__ == "__main__":
    main()
