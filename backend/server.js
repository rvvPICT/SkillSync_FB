import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import emailRoutes from './routes/emailRoutes.js' ;

dotenv.config();

console.log("🔄 Connecting to database...");
await connectDB();
console.log("✅ Database connected!");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);
app.use('/api/email' , emailRoutes) ;

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log("MONGO_URI:", process.env.MONGO_URI);
});

