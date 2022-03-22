require("dotenv").config();

console.log(process.env)
module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": "tekijaneR34",
    "database": "pernstack",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}