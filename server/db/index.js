const db = require("./db");

// require each of your models
const Pokemon = require("./pokemon");
const Trainer = require("./trainer");

// place your associations here!
Pokemon.belongsTo(Trainer);
Trainer.hasMany(Pokemon);

// export your models below

module.exports = {
  db, Trainer, Pokemon
};
