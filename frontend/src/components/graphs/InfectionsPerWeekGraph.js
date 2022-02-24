import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box } from "@mui/material";
//
import { BaseGraphStyle } from "./BaseGraphStyle";

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: "Average",
    type: "area",
    data: [30, 29, 35, 31, 32, 31, 32],
  },
  {
    name: "Infections",
    type: "line",
    data: [45, 35, 64, 52, 59, 36, 39],
  },
];

export default function InfectionsPerWeekGraph() {
  const chartOptions = {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: "11%", borderRadius: 4 } },
    fill: { type: ["solid", "gradient", "solid"] },
    labels: [
      "02/01/2022",
      "02/02/2022",
      "02/03/2022",
      "02/04/2022",
      "02/05/2022",
      "02/06/2022",
      "02/07/2022",
    ],
    xaxis: { type: "datetime" },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== "undefined") {
            return `${y.toFixed(0)} infections`;
          }
          return y;
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader title="Daily Infections" subheader="(/week)" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={CHART_DATA}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
