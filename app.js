require("dotenv").config();
// dotenv.config({ path: __dirname + "/.env" });
require("express-async-errors");
// packages
const morgan = require("morgan");
// const cookieParser = require("cookie-parser");

// expres

const express = require("express");
const app = express();
const cors = require("cors");
// database
const connectDB = require("./db/connect");

// routers

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const categoryRouter = require("./routes/categoryRoute");
const subCategoryRouter = require("./routes/subCategoryRoute");
// const productRouter = require("./routes/productRoutes");

// USING MIDDLEWARE
app.use(morgan("tiny"));
app.use(express.json());
// app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());

// app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/subCategory", subCategoryRouter);
// app.use("/api/v1/products", productRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    app.listen(port, console.log(`server is listing on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
