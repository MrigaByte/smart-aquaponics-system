// import React from "react";
import Chart from "react-apexcharts";

function TemperatureChart(props) {
  const options = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 15,
          size: "70%",
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "13px",
          },
          value: {
            color: "#111",
            fontSize: "30px",
            show: true,
            formatter: function (val) {
              return val;
            },
          },
        },
      },
    },
    labels: ["Humidity(in %)"],
  };

  const series = [props.humidity];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Humidity</h2>
      <Chart options={options} series={series} type="radialBar" height={300} />
    </div>
  );
}

export default TemperatureChart;
