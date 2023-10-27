const express = require("express");
const listViewRouter = express.Router();

const instr= [
  {
    instruccion:
      "Accede a la ruta tasks para ver las tareas, usa los parametros en tasks: para mostrar por id, usa completed-tasks para filtrar las tareas completas e incomplete-tasks en caso contrario",
  },
];

const tasks = require("./data");

// Middleware para gestionar la validez de los parámetros en tus rutas
listViewRouter.param("id", (req, res, next, id) => {
  const taskId = parseInt(id);
  if (isNaN(taskId) || taskId <= 0) {
    return res.status(400).json({ error: "Parámetro ID no válido" });
  }
  next();
});

// Middleware de autorización para permitir a "admin" y "user"
const authorize = (req, res, next) => {
  if (req.role === "admin" || req.role === "user") {
    next();
  } else {
    res.status(403).json({ error: "Access not allowed" });
  }
};

// Aplicar el middleware de autorización a todas las rutas
listViewRouter.use(authorize);

// Ruta para las instrucciones
listViewRouter.get("/", (req, res) => {
  res.status(200).json(instr);
});

// Ruta para listar tareas
listViewRouter.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// Ruta para obtener una tarea por su ID
listViewRouter.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).json({ error: "Tarea no encontrada" });
  }
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