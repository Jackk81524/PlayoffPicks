const { uploadProcessData, uploadPicksData, fetchPicksData, addGame, fetchStandingsData, initializeFirebaseApp } = require('./firebase');
const express = require('express')
const cors = require('cors');

const app = express()
app.use(express.json());
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

app.get("/api/allData", async (req, res) => {
    try {
        const out = await fetchPicksData();
        res.json({
            Weeks : out
        });
    } catch (error) {
        console.log(error);
        return error.Error;
    }
});

app.post("/api/updatePick", async (req, res) => {
    try {
        const requestData = req.body;

        const out = await uploadPicksData(requestData);
        res.json({
            result : out
        });
    } catch (error) {
        console.log(error);
        return error.Error;
    }
});

app.post("/api/addGame", async (req, res) => {
    try {
        const requestData = req.body;

        const out = await addGame(requestData);
        res.json({
            result : out
        });
    } catch (error) {
        console.log(error);
        return error.Error;
    }
});

app.get("/api/getStandings", async (req, res) => {
    try {
        const out = await fetchStandingsData();
        res.json({
            Standings : out
        });
    } catch (error) {
        console.log(error);
        return error.Error
    }
});

app.listen(5000, console.log("Server started..."))