/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import * as React from "react";
import { Cell, Label, Pie, PieChart } from "recharts";

interface AnalyticsPieProps<T> {
  title?: string;
  description?: string;
  data: T[];
  dataKey: keyof T; // e.g., 'count'
  nameKey: keyof T; // e.g., 'status' | 'plan'
  colors?: string[]; // optional custom colors
}

const DEFAULT_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
];

export function AnalyticsPie<T>({
  title = "Pie Chart - Donut with Text",
  description = "January - June 2024",
  data,
  dataKey,
  nameKey,
  colors = DEFAULT_COLORS,
}: AnalyticsPieProps<T>) {
  const total = React.useMemo(
    () => data.reduce((acc, curr) => acc + Number(curr[dataKey]), 0),
    [data, dataKey]
  );

  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {};
    data.forEach((d, i) => {
      const name = String(d[nameKey]);
      const color = (d as any).fill || colors[i % colors.length];
      config[name] = { label: name, color };
    });
    return config;
  }, [data, nameKey, colors]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data as any}
              dataKey={String(dataKey)}
              nameKey={String(nameKey)}
              innerRadius={60}
              strokeWidth={5}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={(entry as any).fill || colors[index % colors.length]}
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing totals for the selected period
        </div>
      </CardFooter>
    </Card>
  );
}
