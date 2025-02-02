import { useState } from "react";

const AirPumpButton = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = async () => {
    console.log("Button pressed"); // Log button press
    const newMotorState = !isOn;
    setIsOn(newMotorState);
    console.log("Sending state:", newMotorState);
    try {
      const response = await fetch("http://localhost:3000/airpump-state", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state: newMotorState }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Air Pump</h2>
      <button
        className={`toggle-button ${isOn ? "toggled" : ""}`}
        onClick={handleToggle}
      >
        Air Pump
        {isOn ? " ON" : " OFF"}
      </button>
    </div>
  );
};

export default AirPumpButton;
