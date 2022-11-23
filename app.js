require('dotenv').config();
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/404');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Middleware
app.use(express.static('./public'));
app.use(express.json());

// Routes
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

// Ports
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port: ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
