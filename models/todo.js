'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {

    static associate(models) {
    }

  }

  Todo.init(
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
    //     validate: {
    //       notNull: { msg: 'User must have a name' },
    //       notEmpty: { msg: 'Name must not be empty' },
    //     },
      }
    },
    {
      sequelize,
      tableName: 'taskovi',
      modelName: 'Todo',
    }
  )
  return Todo
}