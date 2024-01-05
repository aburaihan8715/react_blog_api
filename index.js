import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";

import { authRoute } from "./routes/auth.js";
import { userRoute } from "./routes/users.js";
import { postRoute } from "./routes/posts.js";
import { categoryRoute } from "./routes/categories.js";
import { upload } from "./multer/upload-file.js";

const app = express();
const port = process.env.SERVER_PORT || 5001;
const __dirname = path.resolve();

// database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Db is connected!"))
  .catch((error) => {
    console.log("Db connection error: " + error);
  });

// middlewares
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

// upload file
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

// running server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
