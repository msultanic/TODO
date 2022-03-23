"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {
    static associate(models) {}
  }

  Todos.init(
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "todos",
      modelName: "Todos",
    }
  );
  return Todos;
};
