const express = require("express");
const app = express();
const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");

app.use(express.json());

// Usar el router de list-view en la ruta /list-view
app.use("/list-view", listViewRouter);

// Usar el router de list-edit en la ruta /list-edit
app.use("/list-edit", listEditRouter);

const port = 8080;

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
