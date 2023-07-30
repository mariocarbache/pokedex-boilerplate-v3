const {Sequelize, DataTypes} = require("sequelize");
const db = require("./db");

const Trainer = db.define("Trainer", {

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    team: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    image: {
        type: DataTypes.STRING,
        defaultValue: "image",
    },
});

module.exports = Trainer;

