import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

export default function (props) {
  return (
    <section id="weather">
      {Object.keys(props).map((key, i) => {
        const element = props[key];
        return (
          <VictoryChart
            key={"weather_graph"+i}
            theme={VictoryTheme.material}
            domainPadding={{ x: 20 }}
          >
            <VictoryAxis
              tickValues={[1]}
              tickFormat={[`${element.value}${element.symbol}\n${element.label}`]}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={x => `${x}${element.symbol}`}
            />
            <VictoryBar
              style={{ data: { fill: "gray" } }}
              barWidth={100}
              data={[{ x: 1, metric: element.value }]}
              x="x"
              y="metric"
            />
          </VictoryChart>
        );
      })}
    </section>
  );
}