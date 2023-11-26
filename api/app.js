const express = require("express");

const morgan = require("morgan");

const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

app.use(globalErrorHandler);
module.exports = app;
