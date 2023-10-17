const express = require("express");
const listViewRouter = express.Router();

const tasks = [
  { id: 1, description: "Hacer comida", completed: false },
  { id: 2, description: "Estudiar JavaScript", completed: true },
  { id: 3, description: "Estudiar Python", completed: true },
];

// Ruta para listar tareas completas
listViewRouter.get("/completed-tasks", (req, res) => {
  const completedTasks = tasks.filter((task) => task.completed);
  res.status(200).json(completedTasks);
});

// Ruta para listar tareas incompletas
listViewRouter.get("/incomplete-tasks", (req, res) => {
  const incompleteTasks = tasks.filter((task) => !task.completed);
  res.status(200).json(incompleteTasks);
});

module.exports = listViewRouter;
