const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const noteRouter = require("./routes/noteRoutes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/notes", noteRouter);

mongoose
  .connect(process.env.MONG_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Connection error", error.message);
  });