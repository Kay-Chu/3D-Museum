
import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';

import dalleRoutes from './routes/dalle.routes.js';
import uploadRoutes from './routes/uploadRoute.js';

dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }));
  
  
app.use(express.json({limit:"50mb"}));

app.use('/api/ar', express.static('public/ar'));

app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1/upload', uploadRoutes);

app.get('/', (req, res)=>{
    res.status(200).json({message:"Hello from dalle"})
})

app.listen(8081,()=> console.log("Server has started on port 8081"))