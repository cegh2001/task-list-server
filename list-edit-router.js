const express = require("express");
const listEditRouter = express.Router();

const instr = [
  {
    instruccion:
      "Accede a la ruta create-task, delete-task o update-task para crear, eliminar o actualizar una tarea (en estos casos usa parametros por id)",
  },
];

const tasks = require("./data");

// Middleware de autorización
const authorize = (allowedRoles) => {
  return (req, res, next) => {
    if (allowedRoles.includes(req.role)) {
      next();
    } else {
      res.status(403).json({ error: "Access not allowed" });
    }
  };
};

// Middleware para manejar los errores de solicitud POST y PUT
const validateRequestBody = (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Cuerpo de solicitud vacío" });
    } else {
      const requiredAttributes = ["description", "completed"];
      for (const attr of requiredAttributes) {
        if (!(attr in req.body)) {
          return res.status(400).json({ error: `Falta el atributo: ${attr}` });
        }
      }
    }
  }
  next();
};

// Rutas con middleware de autorización y validación de cuerpo de solicitud
listEditRouter.use(validateRequestBody);

listEditRouter.get("/", authorize(["admin", "user"]), (req, res) => {
  res.status(200).json(instr);
});

listEditRouter.post(
  "/create-task",
  authorize(["admin", "user"]),
  (req, res) => {
    const newTask = req.body;
    tasks.push(newTask);
    res.status(201).json(newTask);
  }
);

listEditRouter.get("/delete-task", authorize(["admin"]), (req, res) => {
  res.status(200).json("usa los parametros por id");
});

listEditRouter.delete("/delete-task/:id", authorize(["admin"]), (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    tasks.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Tarea no encontrada");
  }
});

listEditRouter.get("/update-task", authorize(["admin"]), (req, res) => {
  res.status(200).json("usa los parametros por id");
});

listEditRouter.put("/update-task/:id", authorize(["admin"]), (req, res) => {
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
