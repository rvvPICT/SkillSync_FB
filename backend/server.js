import express from "express";
import cors from "cors";
import https from 'http' ;
//import {Server} from 'socket.io' ;
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import emailRoutes from './routes/emailRoutes.js' ;
import notificationRoutes from './routes/notificationRoutes.js' ;
import { authenticateUser } from "./middleware/authMiddleware.js";
import qnaRoutes from "./routes/qnaRoutes.js";
dotenv.config();

console.log("🔄 Connecting to database...");
await connectDB();
console.log("✅ Database connected!");

const app = express();
// const server = https.createServer(app) ;
// const io = new Server(server , {
//     cors : {origin : '*'}
// });
app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);
app.use('/api/email' , emailRoutes) ;
app.use("/api/notifications" , notificationRoutes) ;
app.use("/api/qna", qnaRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log("MONGO_URI:", process.env.MONGO_URI);
});


// global.io = io ;
// io.on('connection' , (socket) => {
//     console.log('Socket Connected :',socket.id) ;

//     socket.on('join' , (userId) => {
//         socket.join(userId) ;
//         console.log(`User ${userId} joined room`) ;
//     });

//     socket.on('disconnect' , ()=>{
//         console.log('User disconnected :' , socket.io) ;
//     });
// });
