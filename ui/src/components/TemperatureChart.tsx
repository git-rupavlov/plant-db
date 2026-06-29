import ReactECharts from "echarts-for-react";
import type { PlantRecord } from "../types";

interface Props {
  plant: PlantRecord;
}

export function TemperatureChart({ plant }: Props) {
  const germination = plant.ideal_conditions.germination?.soil_temp_c;
  const flowering = plant.ideal_conditions.flowering?.optimum_temp_c;
  const fruiting = plant.ideal_conditions.fruiting?.optimum_temp_c;

  const rows = [
    germination
      ? { stage: "Germination soil", min: germination.min, max: germination.max, optMin: germination.optimum_min, optMax: germination.optimum_max }
      : null,
    flowering
      ? { stage: "Flowering", min: flowering.min, max: flowering.max, optMin: flowering.min, optMax: flowering.max }
      : null,
    fruiting
      ? { stage: "Fruiting", min: fruiting.min, max: fruiting.max, optMin: fruiting.min, optMax: fruiting.max }
      : null
  ].filter(Boolean) as Array<{ stage: string; min: number; max: number; optMin: number; optMax: number }>;

  const option = {
    title: {
      text: "Temperature suitability",
      left: "center"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" }
    },
    legend: {
      top: 28
    },
    grid: {
      left: 140,
      right: 32,
      top: 80,
      bottom: 32
    },
    xAxis: {
      type: "value",
      name: "°C"
    },
    yAxis: {
      type: "category",
      data: rows.map((row) => row.stage)
    },
    series: [
      {
        name: "Viable range start",
        type: "bar",
        stack: "viable",
        itemStyle: { color: "transparent" },
        emphasis: { disabled: true },
        data: rows.map((row) => row.min)
      },
      {
        name: "Viable range",
        type: "bar",
        stack: "viable",
        data: rows.map((row) => row.max - row.min)
      },
      {
        name: "Optimum start",
        type: "bar",
        stack: "optimum",
        itemStyle: { color: "transparent" },
        emphasis: { disabled: true },
        data: rows.map((row) => row.optMin)
      },
      {
        name: "Optimum range",
        type: "bar",
        stack: "optimum",
        data: rows.map((row) => row.optMax - row.optMin)
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: 320 }} />;
}
