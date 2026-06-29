import ReactECharts from "echarts-for-react";
import type { ClimateProfile, MonthlyClimate, PlantRecord } from "../types";

interface Props {
  climate: ClimateProfile;
  plant: PlantRecord;
}

function scoreMonth(month: MonthlyClimate, plant: PlantRecord): number {
  const veg = plant.ideal_conditions.vegetative_growth?.day_temp_c;
  const light = plant.ideal_conditions.light;

  let score = 100;

  if (veg) {
    if (month.avg_max_c < veg.min) score -= (veg.min - month.avg_max_c) * 8;
    if (month.avg_mean_c < veg.min) score -= (veg.min - month.avg_mean_c) * 5;
    if (month.avg_mean_c > veg.max) score -= (month.avg_mean_c - veg.max) * 5;
    if (month.avg_max_c > veg.max + 5) score -= (month.avg_max_c - veg.max) * 4;
  }

  if (light?.sunlight_min_hours && month.sun_hours < light.sunlight_min_hours) {
    score -= (light.sunlight_min_hours - month.sun_hours) * 10;
  }

  score -= month.frost_level * 25;

  return Math.max(0, Math.min(100, Math.round(score)));
}

export function ClimateOverlayChart({ climate, plant }: Props) {
  const rows = climate.months.map((month) => ({
    ...month,
    suitability: scoreMonth(month, plant)
  }));

  const option = {
    title: {
      text: `${plant.species.common_name_bg} × ${climate.label}`,
      subtext: "Monthly climate overlay: temperature, rain, GDD and crop suitability",
      left: "center"
    },
    tooltip: {
      trigger: "axis"
    },
    legend: {
      top: 48
    },
    grid: {
      left: 56,
      right: 64,
      top: 96,
      bottom: 40
    },
    xAxis: {
      type: "category",
      data: rows.map((row) => row.label)
    },
    yAxis: [
      {
        type: "value",
        name: "°C / mm / score",
        min: 0
      },
      {
        type: "value",
        name: "GDD",
        min: 0
      }
    ],
    series: [
      {
        name: "Avg min °C",
        type: "line",
        smooth: true,
        data: rows.map((row) => row.avg_min_c)
      },
      {
        name: "Avg mean °C",
        type: "line",
        smooth: true,
        data: rows.map((row) => row.avg_mean_c)
      },
      {
        name: "Avg max °C",
        type: "line",
        smooth: true,
        data: rows.map((row) => row.avg_max_c)
      },
      {
        name: "Rain mm",
        type: "bar",
        data: rows.map((row) => row.precip_mm)
      },
      {
        name: "Suitability score",
        type: "bar",
        data: rows.map((row) => row.suitability)
      },
      {
        name: "GDD base 10",
        type: "line",
        yAxisIndex: 1,
        smooth: true,
        data: rows.map((row) => row.gdd_base10)
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: 460 }} />;
}
