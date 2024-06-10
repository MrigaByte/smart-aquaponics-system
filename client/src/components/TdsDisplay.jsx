const TdsDisplay = (props) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 min-h-max">
      <h2 className="text-lg font-semibold mb-4">Total Dissolved Salt</h2>
      <h1 className="text-8xl font-semibold ">{props.tdsValue}</h1>
      <p>PPM</p>
    </div>
  );
};

export default TdsDisplay;
