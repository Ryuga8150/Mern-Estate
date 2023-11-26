const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// relative to main folder
dotenv.config({ path: "./config.env" });
// console.log(process.env);
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const server = app.listen(3000, () => {
  console.log("Server is listening");
});

// LAST SAFETY NET
// every error gets carried on process.on which could be used if not handled

// this is for async code
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection! Shutting down...");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
