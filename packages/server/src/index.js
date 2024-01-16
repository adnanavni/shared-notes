const express = require("express");
const noteRouter = require("./routes/noteRoutes");
const userRouter = require("./routes/userRoutes");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
mongoose.set('strictQuery', true);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.info(req.path, req.method);
  next();
});

app.use("/api/notes", noteRouter);
app.use("/api/user", userRouter);

mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    console.info("Connected to MongoDB");
  })
  .catch((err) => {
    console.info(err);
  });

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
});