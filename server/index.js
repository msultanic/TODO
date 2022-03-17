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

      if(req.body.completed){
        todo.set({
          done: 1
        });
        console.log("ok je")
      }
      await todo.save();
      return res.json(todo)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
    
    // console.log("Selaam")
    // // console.log(req.body)
    // console.log(description)
    // return res.json("kako je")
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
      if(todo.done!==null){
        console.log("selam")
        todo.done = null
      }
      else
        todo.done = 1
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
  })