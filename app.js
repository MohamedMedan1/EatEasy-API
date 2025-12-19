const errorHandler = require("./controllers/errorController");
const express = require("express");
const dotenv = require('dotenv'); 
const menuRouter = require('./routes/menuRoutes');
const AppError = require("./utils/appError");

dotenv.config({ path: "./config.env" });

const app = express();

// Body Parser Middleware to add request body
app.use(express.json({ limit: "10kb" }));

// ========   Main Routes   ========
app.use("/api/v1/menu", menuRouter);

// ========   Error Handling Part   ========
app.use("*", (req, _, next) => {
  next(new AppError(`This ${req.originalUrl} url not found in the system`,400));
})
app.use(errorHandler);

module.exports = app;