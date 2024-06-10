require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// const MONGODB_URI =
//   "mongodb+srv://mrigabyte:${process.env.DB_PASSWORD}@cluster0.y8xwzbh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define a schema for the sensor data
const SensorDataSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  waterLevel: {
    type: Number,
    required: true,
  },
  tdsValue: {
    type: Number,
    required: true,
  },
  waterTemperature: {
    type: Number,
    required: true,
  },
  phValue: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create a model based on the schema
const SensorData = mongoose.model("SensorData", SensorDataSchema);
app.post("/sensor-data", (req, res) => {
  const {
    temperature,
    humidity,
    waterLevel,
    tdsValue,
    waterTemperature,
    phValue,
  } = req.body;

  const newSensorData = new SensorData({
    temperature,
    humidity,
    waterLevel,
    tdsValue,
    waterTemperature,
    phValue,
  });

  // Save the data to MongoDB
  newSensorData
    .save()
    .then(() => {
      res.status(201).send("Sensor data saved successfully");
    })
    .catch((err) => {
      console.error("Error saving sensor data:", err);
      res.status(500).send("Internal server error");
    });
});

//motor toggle
let motorToggleState = false; //Initial state
let servoToggleState = false; //Initial state
let airPumpToggleState = false; //Initial state

// Endpoint to update the motor state
app.post("/motor-state", (req, res) => {
  console.log("Received POST request with body:", req.body); // Log received body
  const { state } = req.body;

  if (typeof state === "boolean") {
    motorToggleState = state;
    console.log("Updated motorState to:", motorToggleState); // Log the updated motor state
    res.status(200).json({
      message: "Motor state updated successfully",
      motorState: motorToggleState,
    });
  } else {
    res.status(400).json({ message: "Invalid motor state value" });
  }
});

// Endpoint to update the servo state
app.post("/servo-state", (req, res) => {
  console.log("Received POST request with body:", req.body); // Log received body
  const { state } = req.body;

  if (typeof state === "boolean") {
    servoToggleState = state;
    console.log("Updated servoState to:", servoToggleState); // Log the updated servo state
    res.status(200).json({
      message: "Servo state updated successfully",
      servoState: servoToggleState,
    });
  } else {
    res.status(400).json({ message: "Invalid servo state value" });
  }
});

// Endpoint to update the airpump state
app.post("/airpump-state", (req, res) => {
  console.log("Received POST request with body:", req.body); // Log received body
  const { state } = req.body;

  if (typeof state === "boolean") {
    airPumpToggleState = state;
    console.log("Updated motorState to:", airPumpToggleState); // Log the updated motor state
    res.status(200).json({
      message: "Air Pump state updated successfully",
      airPumpState: airPumpToggleState,
    });
  } else {
    res.status(400).json({ message: "Invalid motor state value" });
  }
});

// Endpoint to get the motor and servo states
app.get("/motor-toggle", (req, res) => {
  console.log("Received GET request"); // Log GET request
  res.status(200).json({
    motorState: motorToggleState,
    servoState: servoToggleState,
    airPumpState: airPumpToggleState,
  });
});

app.get("/", (req, res) => {
  res.send("hello world");
});
// Route to handle GET requests to /latest-sensor-data
app.get("/latest-sensor-data", async (req, res) => {
  try {
    // Query the database for the latest sensor data
    const latestData = await SensorData.findOne()
      .sort({ timestamp: -1 })
      .exec();
    res.json(latestData);
  } catch (error) {
    console.error("Error fetching latest sensor data:", error);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
