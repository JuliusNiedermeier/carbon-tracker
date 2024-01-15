"use client";

import { Card, Title, AreaChart, BarChart, Subtitle, Grid, Flex, Metric, BadgeDelta, Text, DeltaType, Color } from "@tremor/react";
import { FC } from "react";

const chartdataArea = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
  },
];

const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};

export const FakeData: FC = () => {
  return (
    <Card>
      <Title>Newsletter revenue over time (USD)</Title>
      <AreaChart
        className="h-72 mt-4"
        data={chartdataArea}
        index="date"
        categories={["SemiAnalysis", "The Pragmatic Engineer"]}
        colors={["indigo", "cyan"]}
        valueFormatter={dataFormatter}
      />
    </Card>
  );
};

const chartdataBar = [
  {
    name: "Scope 1.1",
    "Number of threatened species": 1445,
  },
  {
    name: "Scope 1.2",
    "Number of threatened species": 743,
  },
  {
    name: "Scope 1.3",
    "Number of threatened species": 743,
  },
  {
    name: "Scope 2.1",
    "Number of threatened species": 743,
  },
  {
    name: "Scope 2.2",
    "Number of threatened species": 743,
  },
  {
    name: "Scope 3.1",
    "Number of threatened species": 743,
  },
  {
    name: "Scope 3.2",
    "Number of threatened species": 743,
  },
  {
    name: "Scope 3.3",
    "Number of threatened species": 743,
  },
  {
    name: "Scope 3.4",
    "Number of threatened species": 743,
  },
  {
    name: "Scope 3.5",
    "Number of threatened species": 743,
  },
  {
    name: "Scope 3.6",
    "Number of threatened species": 743,
  },
  {
    name: "Scope 3.7",
    "Number of threatened species": 743,
  },
  {
    name: "Scope 3.8",
    "Number of threatened species": 743,
  },
];

export const FakeDataBar = () => (
  <Card>
    <Title>Number of species threatened with extinction (2021)</Title>
    <Subtitle>The IUCN Red List has assessed only a small share of the total known species in the world.</Subtitle>
    <BarChart
      className="mt-6"
      data={chartdataBar}
      index="name"
      categories={["Number of threatened species"]}
      colors={["blue"]}
      valueFormatter={dataFormatter}
      yAxisWidth={48}
    />
  </Card>
);

const colors: { [key: string]: Color } = {
  increase: "emerald",
  moderateIncrease: "emerald",
  unchanged: "orange",
  moderateDecrease: "rose",
  decrease: "rose",
};

const categories: {
  title: string;
  metric: string;
  metricPrev: string;
  delta: string;
  deltaType: DeltaType;
}[] = [
  {
    title: "Sales",
    metric: "$ 12,699",
    metricPrev: "$ 9,456",
    delta: "34.3%",
    deltaType: "moderateIncrease",
  },
  {
    title: "Profit",
    metric: "$ 40,598",
    metricPrev: "$ 45,564",
    delta: "10.9%",
    deltaType: "moderateDecrease",
  },
  {
    title: "Customers",
    metric: "1,072",
    metricPrev: "856",
    delta: "25.3%",
    deltaType: "moderateIncrease",
  },
];

export function KPIs() {
  return (
    <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
      {categories.map((item) => (
        <Card key={item.title}>
          <Text>{item.title}</Text>
          <Flex justifyContent="start" alignItems="baseline" className="truncate space-x-3">
            <Metric>{item.metric}</Metric>
            <Text className="truncate">from {item.metricPrev}</Text>
          </Flex>
          <Flex justifyContent="start" className="space-x-2 mt-4">
            <BadgeDelta deltaType={item.deltaType} />
            <Flex justifyContent="start" className="space-x-1 truncate">
              <Text color={colors[item.deltaType]}>{item.delta}</Text>
              <Text className="truncate">to previous month</Text>
            </Flex>
          </Flex>
        </Card>
      ))}
    </Grid>
  );
}
