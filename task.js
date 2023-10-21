const express = require ("express");
const app = express();
const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");

const tasks = require("./data");

const instr = [
  {
    instruccion:
      "Accede a la ruta tasks para ver las tareas, y a list-edit o list-view para modificar las tareas o verlas filtradas",
  },
];

app.use(express.json());

//middleware para verificar que solo lleguen solicitudes por métodos HTTP válidos
app.use((req, res, next) => {
  if (req.method !== "GET" && req.method !== "POST" && req.method !== "PUT" && req.method !== "DELETE") {
    return res.status(400).json({ error: "Método HTTP no válido" });
  }
  next();
});

app.get("/", (req, res) => {
  res.status(200).json(instr);
});

app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// Usar el router de list-view en la ruta /list-view
app.use("/list-view", listViewRouter);

// Usar el router de list-edit en la ruta /list-edit
app.use("/list-edit", listEditRouter);

const port = 8080;

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
