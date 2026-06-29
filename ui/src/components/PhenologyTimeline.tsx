import ReactECharts from "echarts-for-react";
import type { PhenologyStage } from "../types";

interface Props {
  stages: PhenologyStage[];
}

export function PhenologyTimeline({ stages }: Props) {
  const data = stages.map((stage) => ({
    name: stage.stage_name_bg,
    start: stage.days_after_emergence_min,
    duration: Math.max(stage.days_after_emergence_max - stage.days_after_emergence_min, 1),
    end: stage.days_after_emergence_max
  }));

  const option = {
    title: {
      text: "Phenology timeline",
      left: "center"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params: any) => {
        const row = params.find((item: any) => item.seriesName === "Duration");
        if (!row) return "";
        const item = data[row.dataIndex];
        return `${item.name}<br/>Day ${item.start} - ${item.end}`;
      }
    },
    grid: {
      left: 160,
      right: 32,
      top: 56,
      bottom: 32
    },
    xAxis: {
      type: "value",
      name: "Days after emergence"
    },
    yAxis: {
      type: "category",
      inverse: true,
      data: data.map((item) => item.name)
    },
    series: [
      {
        name: "Start",
        type: "bar",
        stack: "total",
        itemStyle: { color: "transparent" },
        emphasis: { disabled: true },
        data: data.map((item) => item.start)
      },
      {
        name: "Duration",
        type: "bar",
        stack: "total",
        data: data.map((item) => item.duration)
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: 420 }} />;
}
