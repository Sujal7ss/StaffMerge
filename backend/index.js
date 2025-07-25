import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "https://staff-merge-lrjg9fzz8-sujals-projects-6f34d0a1.vercel.app",
  "https://staff-merge.vercel.app",
  "http://localhost:5173"
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


const PORT = process.env.PORT || 3000;

// Health check route
app.get("/", async (req, res) => {
  try {
    // Check DB connection status
    const dbStatus = (await connectDB.checkConnection())
      ? "connected"
      : "disconnected";

    res.status(200).json({
      success: true,
      message: "Server is running",
      database: dbStatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Health check failed",
      error: error.message,
    });
  }
});

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
