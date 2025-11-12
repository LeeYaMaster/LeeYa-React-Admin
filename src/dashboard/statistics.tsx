import ECharts from "echarts-for-react";
import React, { useEffect, useRef, useState } from "react";

function Statistics() {
  const chartRef = useRef(null);
  const [option, setOption] = useState({});
  useEffect(() => {
    setOption({
      title: {
        text: "ECharts 入门示例",
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
    });
  }, []);
  return <ECharts ref={chartRef} option={option} />;
}

export default Statistics;
