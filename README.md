# NestJS Application

WebSocket server saving data from sensors to MongoDB using NestJS.

## Prerequisites

Before running the application, you need to add a `.env` file which should look like the example below:

```
DB_URL=mongodb://db:27017/cj-task
APP_PORT=3000
```

## Running the Application

To run the application, use Docker Compose:

```bash
docker-compose up
```

## Sending Data

To send data, send a message through WebSocket to \`ws://host:port\`. Here's an example message:

```
{"sensorId":"sensor1","timestamp":1628000000000,"temperature":22.5,"temperatureUoM":"C","humidity":45,"humidityUoM":"%"}
```

Please note that the server is designed to accept only valid data. If the data is invalid, the client will receive an appropriate error message.