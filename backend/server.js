// import express from "express";
// import cors from "cors";
// import https from 'http' ;
// //import {Server} from 'socket.io' ;
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import projectRoutes from "./routes/projectRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import emailRoutes from './routes/emailRoutes.js' ;
// import notificationRoutes from './routes/notificationRoutes.js' ;
// import { authenticateUser } from "./middleware/authMiddleware.js";
// import qnaRoutes from "./routes/qnaRoutes.js";
// dotenv.config();

// console.log("🔄 Connecting to database...");
// await connectDB();
// console.log("✅ Database connected!");

// const app = express();
// // const server = https.createServer(app) ;
// // const io = new Server(server , {
// //     cors : {origin : '*'}
// // });
// app.use(cors());
// app.use(express.json());

// app.use("/api/projects", projectRoutes);
// app.use("/api/users", userRoutes);
// app.use('/api/email' , emailRoutes) ;
// app.use("/api/notifications" , notificationRoutes) ;
// app.use("/api/qna", qnaRoutes);

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//     console.log("MONGO_URI:", process.env.MONGO_URI);
// });


// import express from "express";
// import cors from "cors";
// import http from 'http'; // Fixed import name from https to http
// import { Server } from 'socket.io'; // Uncomment this import
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import projectRoutes from "./routes/projectRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import emailRoutes from './routes/emailRoutes.js';
// import notificationRoutes from './routes/notificationRoutes.js';
// import { authenticateUser } from "./middleware/authMiddleware.js";
// import qnaRoutes from "./routes/qnaRoutes.js";
// dotenv.config();

// console.log("🔄 Connecting to database...");
// await connectDB();
// console.log("✅ Database connected!");

// const app = express();
// const server = http.createServer(app); // Uncomment and use http instead of https
// const io = new Server(server, {
//     cors: { origin: '*' }
// });

// // Make io globally available
// global.io = io;

// // Setup socket connection listeners if needed
// io.on('connection', (socket) => {
//     console.log('A user connected:', socket.id);
    
//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });
// });

// app.use(cors());
// app.use(express.json());

// app.use("/api/projects", projectRoutes);
// app.use("/api/users", userRoutes);
// app.use('/api/email', emailRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/qna", qnaRoutes);

// const PORT = process.env.PORT || 5001;
// // Use server.listen instead of app.listen
// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//     console.log("MONGO_URI:", process.env.MONGO_URI);
// });


import express from "express";
import cors from "cors";
import http from 'http';
import { Server } from 'socket.io';
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import emailRoutes from './routes/emailRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import { authenticateUser } from "./middleware/authMiddleware.js";
import qnaRoutes from "./routes/qnaRoutes.js";

dotenv.config();

console.log("🔄 Connecting to database...");
await connectDB();
console.log("✅ Database connected!");

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS
const io = new Server(server, { 
    cors: { 
        origin: '*',
        methods: ["GET", "POST"],
        credentials: true
    } 
});

// Make io globally available
global.io = io;

// Setup socket connection listeners
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    // Handle user joining their notification room
    socket.on('join', (data) => {
        if (data && data.userId) {
            socket.join(data.userId.toString());
            console.log(`User ${data.userId} joined their notification room`);
        }
    });
    
    // For testing/debugging
    socket.on('test-notification', (data) => {
        if (data.userId) {
            console.log(`Test notification to ${data.userId}`);
            io.to(data.userId.toString()).emit('test-response', { message: 'Test notification received!' });
        }
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);
app.use('/api/email', emailRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/qna", qnaRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', socketIO: !!global.io });
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Socket.IO server initialized`);
});