const express = require("express");
const noteRouter = require("./routes/noteRoutes");
const userRouter = require("./routes/userRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/notes", noteRouter);
app.use("/api/user", userRouter);

mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});