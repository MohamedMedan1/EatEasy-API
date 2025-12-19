const mongoose = require('mongoose');
const app = require("./app");


const dataBaseURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lj7uzcm.mongodb.net/`;
mongoose.connect(dataBaseURL)
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Database connection error:", err));


const port = 4000;
const server = app.listen(port, () => {
  console.log(`Server is running on ${port} port `)
})

process.on("unhandledRejection", err => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    })
});

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  })
});