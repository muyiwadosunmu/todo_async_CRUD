const { urlencoded } = require("express");
const express = require("express");
const app = express();
const PORT = 3500;

const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require('dotenv').config()

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'A Basic Crud API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/tasks.js'], // files containing annotations as above
};
const openapiSpecification = swaggerJsdoc(options);

// Middlewares
app.use(express.json());
app.use('/api-docs', swaggerUi.serve)

// Routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasks);

// app.get('/api/v1/tasks')  -get all the tasks
// app.post('/api/v1/tasks')  -create a new task
// app.get('/api/v1/tasks/:id')  -get a single task
// app.patch('/api/v1/tasks/:id')  -update task
// app.delete('/api/v1/tasks/:id')  - delete task

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, console.log(`Server is listening on port ${PORT}....`));
  } catch (error) {
    console.log(error);
  }
};

start();

