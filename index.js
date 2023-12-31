import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import multer from "multer";

import { authRoute } from "./routes/auth.js";
import { userRoute } from "./routes/users.js";
import { postRoute } from "./routes/posts.js";
import { categoryRoute } from "./routes/categories.js";

const app = express();
const port = process.env.SERVER_PORT || 5001;

// middlewares
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Db is connected!"))
  .catch((error) => console.log(error));

// routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
