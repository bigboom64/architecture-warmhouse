const express = require('express');
const app = express();
const port = process.env.PORT || 8081; // Используем переменную окружения или 8081

const roomToSensorId = {
  "Living Room": "1",
  "Bedroom": "2",
  "Kitchen": "3",
};

const sensorIdToRoom = {
  "1": "Living Room",
  "2": "Bedroom",
  "3": "Kitchen",
};

function getRandomTemperature() {
  return (Math.random() * 15 + 15).toFixed(1); // 15.0°C - 30.0°C
}

app.get('/temperature', (req, res) => {
  let { location, sensorId } = req.query;

  if (!location) {
    location = sensorIdToRoom[sensorId] || "Unknown";
  }

  if (!sensorId) {
    sensorId = roomToSensorId[location] || "0";
  }

  const temperature = getRandomTemperature();

  res.json({
    location,
    sensorId,
    temperature: `${temperature} °C`
  });
});

app.listen(port, () => {
  console.log(`Temperature API running on port ${port}`);
});