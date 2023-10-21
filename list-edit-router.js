const express = require("express");
const listEditRouter = express.Router();

const instr = [
  {
    instruccion:
      "Accede a la ruta create-tasks, delete-tasks o update-tasks para crear, eliminar o actualizar una tarea, por id",
  },
];

const tasks = require('./data');

//middleware para manejar los errores de solicitud POST y PUT
listEditRouter.use((req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Cuerpo de solicitud vacío" });
    } else {
      // Verifica que el cuerpo de la solicitud contenga la información requerida
      const requiredAttributes = ["description", "completed"]; 
      for (const attr of requiredAttributes) {
        if (!(attr in req.body)) {
          return res.status(400).json({ error: `Falta el atributo: ${attr}` });
        }
      }
    }
  }
  next();
});


// Ruta para listar tareas
listEditRouter.get("/", (req, res) => {
  res.status(200).json(instr);
  res.status(200).json(tasks);
});

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
