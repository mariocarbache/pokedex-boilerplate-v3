const path = require("path");
const express = require("express");
const volleyball = require("volleyball");
const app = express();
const db = require("./db/index");
const Pokemon = require("./db/pokemon");
const Trainer = require("./db/trainer");
module.exports = app;

// Logging middleware
app.use(volleyball);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(
  express.static(
    path.join(__dirname, "..", "node_modules", "font-awesome", "css")
  )
);
app.use(
  "/fonts",
  express.static(
    path.join(__dirname, "..", "node_modules", "font-awesome", "fonts")
  )
);

app.use("/api", require("./api"));

app.use((req, res, next) => {
  if (path.extname(req.path).length > 0) {
    res.status(404).end();
  } else {
    next();
  }
});

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// Error catching endware
app.use((err, req, res, next) => {
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

app.get('/pokemon', async (req, res) =>{
  const pokemon = await Pokemon.findAll();
  res.json(pokemon);
});

app.get("/pokemon/:id", async (req, res) => {
  const pokemon = await Pokemon.findByPk(req.params.id);
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).send("Pokemon not found");
  }
});

app.get("/trainer/:id", async (req, res) => {
  const trainer = await Trainer.findByPk(req.params.id);
  if (trainer) {
    res.json(trainer);
  } else {
    res.status(404).send("Trainer not found");
  }
});

app.post("/pokemon", async (req, res) => {
  const newPokemon = await Pokemon.create(req.body);
  res.json(newPokemon);
});

app.post("/trainer", async (req, res) => {
  const newTrainer = await Trainer.create(req.body);
  res.json(newTrainer);
});

app.put("/pokemon/:id", async (req, res) => {
  const pokemon = await Pokemon.findByPk(req.params.id);
  if (pokemon) {
    await pokemon.update(req.body);
    res.json(pokemon);
  } else {
    res.status(404).send("Pokemon not found");
  }
});

app.put("/trainer/:id", async (req, res) => {
  const trainer = await Trainer.findByPk(req.params.id);
  if (trainer) {
    await trainer.update(req.body);
    res.json(trainer);
  } else {
    res.status(404).send("Trainer not found");
  }
});

app.delete("/pokemon/:id", async (req, res) => {
  const pokemon = await Pokemon.findByPk(req.params.id);
  if (pokemon) {
    await pokemon.destroy();
    res.status(204).send();
  } else {
    res.status(404).send("Pokemon not found");
  }
});

app.delete("/trainer/:id", async (req, res) => {
  const trainer = await Trainer.findByPk(req.params.id);
  if (trainer) {
    await trainer.destroy();
    res.status(204).send();
  } else {
    res.status(404).send("Trainer not found");
  }
});