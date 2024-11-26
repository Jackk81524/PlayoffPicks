const express = require('express')
const app = express()

// app.use("/", (req, res) => {
//     res.send("Server is running...")
// })

app.get("/api/data", (req, res) => {
    res.json({
        message: "Hello from the API!",
        success: true,
        data: [1, 2, 3, 4, 5]
    });
});

app.listen(5000, console.log("Server started..."))