const express = require('express');

const app = express();

const port = 3000;

app.use(express.json());

const tasks = [
   {
        id: 1,
        title: "Learn Express",
        done: false
    },
    {
        id: 2,
        title: "Build Task API",
        done: true
    },
    {
        id: 3,
        title: "Commit Assignment",
        done: false
    }
];

app.get("/", (req, res) => {
    res.json({
        name: "Task API",
        version: "1.0",
        endpoints: ["/tasks"]
    });
});

// GET /health
app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})