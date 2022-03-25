const express = require("express");
const { sequelize, Todos } = require('./models')
const cors=require("cors");

const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}

const app = express();
app.use(express.json());
app.use(cors(corsOptions))

app.post("/todos", async (req, res) => {
    const { description } = req.body;
    try {
      const todo = await Todos.create({ description})
      return res.json(todo)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })

  app.post("/todos/all", async (req, res) => {
    const description = req.body.title
    
    try {
      const todo = await Todos.create({ description})
      todo.completed = req.body.completed
      await todo.save();
      return res.json(todo)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })
  
  app.get('/todos', async (req, res) => {
    try {
      const todos = await Todos.findAll()
      return res.json(todos)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  app.get('/todos/:id', async (req, res) => {
    const id = req.params.id
    try {
      const todo = await Todos.findOne({
        where: { id },
        include: 'posts',
      })
      return res.json(todo)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  app.delete('/todos/:id', async (req, res) => {
    const id = req.params.id
    try {
      const todo = await Todos.findOne({ where: { id } })
      await todo.destroy()
      return res.json({ message: 'Todo deleted!' })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  app.put('/todos/:id', async (req, res) => {
    const id = req.params.id
    const { description } = req.body
    try {
      const todo = await Todos.findOne({ where: { id } })
      todo.description = description
      await todo.save()
      return res.json(todo)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

  app.put('/todos/done/:id', async (req, res) => {
    const id = req.params.id
    try {
      const todo = await Todos.findOne({ where: { id } })
      todo.completed=!todo.completed
      await todo.save()
      return res.json(todo)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })

  app.listen({port:9000}, async() => {
    console.log("server has started on port 9000")
    await sequelize.authenticate()
    await sequelize.sync({force: false, alter: true});

  })