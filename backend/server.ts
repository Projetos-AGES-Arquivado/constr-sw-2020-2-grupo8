const express = require("express");

import errorHandler from "./errors/handler";
import routes from "./routes/routes";

/* Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks. */
import mongoose from "mongoose";

import cors from "cors";

import { serve, setup } from "swagger-ui-express";

import { load } from "yamljs";

const swaggerDocument = load("./swagger.yml");

const port = 3333;
const url = "mongodb://localhost:27017/disciplinas";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use("/api/docs", serve, setup(swaggerDocument));
app.use(errorHandler);

app.listen(port, () => console.log(`App listening on port ${port}!`));