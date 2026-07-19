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

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  
  const id = Number(req.params.id);
  
  const task = tasks.find(task => task.id === id);
  
  if (!task) {
    return res.status(404).json({
      error: `Task ${id} not found`
    });
  }
  
  res.json(task);
});

app.post("/tasks", (req, res) => {
  const {title} = req.body;

  if (!title||title.trim() === "") {
    return res.status(400).json({
      error: "Title is required"
    });
  }
  const nextId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
  const newTask = {
    id: nextId,
    title: title.trim(),
    done: false
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


