const express = require('express')
const cors = require('cors');

const app = express()

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

app.get("/api/data", (req, res) => {
    res.json({
        message: "Hello from the API!",
        success: true,
        data: [1, 2, 3, 4, 5]
    });
});

app.listen(5000, console.log("Server started..."))