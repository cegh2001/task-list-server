const express = require("express");
const listViewRouter = express.Router();

const instr= [
  {
    instruccion:
      "Accede a la ruta completed-tasks para filtrar las tareas completas e incomplete-tasks en caso contrario",
  },
];

const tasks = require('./data');

//middleware para gestionar la validez de los parámetros en tus rutas
listViewRouter.param("id", (req, res, next, id) => {
  const taskId = parseInt(id);
  if (isNaN(taskId) || taskId <= 0) {
    return res.status(400).json({ error: "Parámetro ID no válido" });
  }
  next();
});

// Ruta para listar tareas
listViewRouter.get("/", (req, res) => {
  res.status(200).json(instr);
  res.status(200).json(tasks);
});

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
