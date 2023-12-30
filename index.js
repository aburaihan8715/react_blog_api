import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Db is connected!"))
  .catch((error) => console.log(error));

const app = express();
const port = process.env.SERVER_PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
