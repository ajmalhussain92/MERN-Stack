import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";

import courseRoute from "./routes/course.route.js";
import userRoute from "./routes/user.route.js";

// === Server Creation (Express) ===
const app = express();
dotenv.config();

// middleware
app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

const port = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI;

// Catch Server error if any!
try {
  await mongoose.connect(DB_URI);   // Wait until the Database is connected
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}

// Defining routes 
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/user", userRoute);

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

app.get('/', (req, res) => {
  res.send('Md Ajmal Hussain');
});

app.listen(port, () => {
  console.log(`Express Server listening on port ${port}`);
});