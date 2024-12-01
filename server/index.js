const { uploadProcessData, initializeFirebaseApp } = require('./firebase');
const express = require('express')
const cors = require('cors');

const app = express()
initializeFirebaseApp();

const allowedOrigins = [
    'http://localhost:3000', 
    'https://playoff-picks-client.vercel.app' 
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
    }, 
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'], 
};
  
app.use(cors(corsOptions));

app.get("/api/data", async (req, res) => {
    try {
        const out = await uploadProcessData();
        res.json({
            out: out
        });
    } catch (error) {
        console.log("testing");
        return error.Error;
    }
});

app.listen(5000, console.log("Server started..."))