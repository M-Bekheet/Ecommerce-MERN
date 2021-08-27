const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const logger = require("morgan");
const chalk = require("chalk");
const userRouter = require("./routers/user.router");
const productRouter = require("./routers/product.router");
const orderRouter = require("./routers/order.router");

/**
 * Config:
 **/

// Environment Variables
dotenv.config();
const {
  PORT = 5000,
    DB_URL,
    SESS_SECRET,
    NODE_ENV = "development",
} = process.env;

// Basic Middlwares
const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cors());

//session mdlw should be before routes mdlws
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: NODE_ENV === "production",
      sameSite: true,
      maxAge: 60000,
    },
  })
);

// Routers
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

// DB
mongoose.connect(DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port.`);
});