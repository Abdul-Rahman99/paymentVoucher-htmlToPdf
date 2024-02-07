const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const db_connection = require("./config/db");
const ApiError = require("./utils/apiError");
const mountRoutes = require("./routes");
dotenv.config({ path: "config.env" });

// connecting to the database
db_connection();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Middlewares
app.use(express.json());
app.set("view engine", "pug");

// API Routes
mountRoutes(app);

app.use("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// listening on server 7777
const PORT = process.env.PORT || 7777;
const server = app.listen(PORT, () => {
  console.log(`App is Running on port: ${PORT}`);
});

// @desc handling rejections outside express
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Errros ${err.name} and ${err.message}`);
  server.close(() => {
    console.log("Shutting down the server");
    process.exit(1);
  });
});
