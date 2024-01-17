const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute");
const listRouter = require("./routes/listRoute");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.set("trust-proxy", true);

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listRouter);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

app.use(globalErrorHandler);
module.exports = app;
