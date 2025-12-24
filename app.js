const errorHandler = require("./controllers/errorController");
const express = require("express");
const dotenv = require('dotenv'); 
const menuRouter = require('./routes/menuRoutes');
const tablesRouter = require('./routes/tablesRoutes');
const stockRouter = require('./routes/stockRoutes');
const ordersRouter = require('./routes/ordersRoutes');
const adminRouter = require('./routes/adminRoutes');
const AppError = require("./utils/appError");

dotenv.config({ path: "./config.env" });

const app = express();

// Body Parser Middleware to add request body
app.use(express.json({ limit: "10kb" }));

// ========   Main Routes   ========
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/tables", tablesRouter);
app.use("/api/v1/stock", stockRouter);
app.use("/api/v1/orders", ordersRouter);

// ========   Auth Route   ========
app.use("/api/v1/admins", adminRouter);

// ========   Error Handling Part   ========
app.use("*", (req, _, next) => {
  next(new AppError(`This ${req.originalUrl} url not found in the system`,400));
})
app.use(errorHandler);

module.exports = app;