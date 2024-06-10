import Chart from "react-apexcharts";

function WaterLevel(props) {
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
    labels: ["Water Level(in cm)"],
  };

  // const series = [props.waterLevel];
  const series = [24.6];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Water Level</h2>
      <Chart options={options} series={series} type="radialBar" height={300} />
    </div>
  );
}

export default WaterLevel;
