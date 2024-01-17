require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./router/auth-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middleware/error-middleware");
const contactRouter = require("./router/contact-router");

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
app.use(errorMiddleware);

const PORT = 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});
