require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./router/auth-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middleware/error-middleware");
const contactRouter = require("./router/contact-router");
const serviceRouter = require("./router/service-router");
const adminRoute = require("./router/admin-router");

// middleware
const corsOption = {
  origin: "http://localhost:5173",
  method: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credential: true,
};

app.use(cors(corsOption));
app.use(express.json());

// router
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use("/api/data", serviceRouter);
app.use(errorMiddleware);

// define admin route
app.use("/api/admin", adminRoute);

const PORT = 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});
