import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TemperatureChart from "./components/TemperatureChart";
import HumidityChart from "./components/HumidityChart";
import WaterLevel from "./components/WaterLevel";
import ServoButton from "./components/ServoButton";
import MotorButton from "./components/MotorButton";
import WaterTemperature from "./components/WaterTemperature";
// import PhChart from "./components/PhChart";
import TdsDisplay from "./components/TdsDisplay";
import PhDisplay from "./components/PhDisplay";
import AirPumpButton from "./components/AirPumpButton";

function App() {
  // // const temp = 30;
  const [latestData, setLatestData] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/latest-sensor-data"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLatestData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 100);

    return () => clearInterval(interval);
  }, []);

  // const waterLevelData = [];
  // waterLevelData.push(String(latestData.waterLevel));
  // console.log(waterLevelData);

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex-grow flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <TemperatureChart temperature={latestData.temperature} />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <HumidityChart humidity={latestData.humidity} />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <WaterLevel waterLevel={latestData.waterLevel} />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4 ">
            <ServoButton />
            <MotorButton />
            <AirPumpButton />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <WaterTemperature wTemperature={latestData.waterTemperature} />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4 ">
            <TdsDisplay tdsValue={latestData.tdsValue} />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4 ">
            <PhDisplay phValue={latestData.phValue} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
