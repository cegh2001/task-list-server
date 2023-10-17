const express = require("express");
const listEditRouter = express.Router();

const tasks = [
  { id: 1, description: "Hacer comida", completed: false },
  { id: 2, description: "Estudiar JavaScript", completed: true },
  { id: 3, description: "Estudiar Python", completed: true },
];

// Ruta para crear una tarea
listEditRouter.post("/create-task", (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Ruta para eliminar una tarea por ID
listEditRouter.delete("/delete-task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    tasks.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Tarea no encontrada");
  }
});

// Ruta para actualizar una tarea por ID
listEditRouter.put("/update-task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    res.status(200).json(tasks[index]);
  } else {
    res.status(404).send("Tarea no encontrada");
  }
});

module.exports = listEditRouter;
