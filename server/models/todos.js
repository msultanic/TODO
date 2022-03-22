'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {

    static associate(models) {
    }

  }

  Todos.init(
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
    //     validate: {
    //       notNull: { msg: 'User must have a name' },
    //       notEmpty: { msg: 'Name must not be empty' },
    //     },
      },
      done: {
        type: DataTypes.INTEGER,
        allowNull: true // v
    //     validate: {
    //       notNull: { msg: 'User must have a name' },
    //       notEmpty: { msg: 'Name must not be empty' },
    //     },
      }
    },
    {
      sequelize,
      tableName: 'tasks',
      modelName: 'Todos',
    }
  )
  return Todos
}