const PhDisplay = (props) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 min-h-max">
      <h2 className="text-lg font-semibold mb-4">pH value of Water</h2>
      <h1 className="text-8xl font-semibold ">{props.phValue}</h1>
      <p>‎ </p>
    </div>
  );
};

export default PhDisplay;
