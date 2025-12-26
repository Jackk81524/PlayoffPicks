const { uploadProcessData, uploadPicksData, fetchPicksData, addGame, fetchStandingsData, initializeFirebaseApp, addResult, addWeek, resetScores } = require('./firebase');
const express = require('express')
const cors = require('cors');

const app = express()
app.use(express.json());
initializeFirebaseApp();

const allowedOrigins = [
    'http://localhost:3000', 
    'https://playoff-picks-client.vercel.app',
    'https://playoff-picks.vercel.app',
    'https://playoff-picks-97jl.vercel.app'
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

app.post('/api/resetScores', async (req, res) => {
    try {
        const user = req.body && req.body.user;
        if (user !== 'Jack') {
            return res.status(403).json({ error: 'Forbidden' });
        }
        await resetScores();
        return res.json({ status: 'success' });
    } catch (error) {
        console.error('resetScores error', error);
        return res.status(500).json({ error: 'reset failed' });
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
        res.json(out);
    } catch (error) {
        console.log(error);
        return error.Error
    }
});

app.post("/api/addResult", async (req, res) => {
    try {
        const requestData = req.body;

        const out = await addResult(requestData);
        res.json({
            result : out
        });
    } catch (error) {
        console.log(error);
        return error.Error;
    }
});

app.post("/api/addWeek", async (req, res) => {
    try {
        const requestData = req.body;

        const out = await addWeek(requestData);
        res.json({
            result : out
        });
    } catch (error) {
        console.log(error);
        return error.Error;
    }
});

app.listen(5001, console.log("Server started..."))