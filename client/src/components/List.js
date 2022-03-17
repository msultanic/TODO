import React, {Fragment,useEffect, useState} from "react";
import InputTodo from "./InputTodo";

var _ = require('lodash');
var _ = require('lodash/core');

const List = () => {
    const [todos, setTodos] = useState([]);
    const [edit, setEdit] = useState(null);

    const deleteTask = id => {
      try {
        const deleteTodo = fetch(`http://localhost:9000/todos/${id}`, {
          method: "DELETE"
        });
  
        setTodos(todos.filter(todo => todo.id !== id));
      } catch (err) {
        console.error(err.message);
      }
    } 

    const updateDone = async id => {
      try {
        const response = await fetch(
          `http://localhost:9000/todos/done/${id}`,
          {
            method: "PUT"
          }
        );
        getTodos();
      } catch (err) {
        console.error(err.message);
      }
    };
  
    const getTodos = async () => {
      try {
        const response = await fetch("http://localhost:9000/todos");
        const jsonData = await response.json();
        var sorted = _.sortBy(jsonData, "id")
        if(sorted.length === 0){
          const response1 = await fetch("https://jsonplaceholder.typicode.com/todos");
          const jsonData1 = await response1.json();
          sorted=_.sortBy(jsonData1, "id")
          sorted=_.slice(sorted, 0, 20)
          for(var i=0; i<20; i++){
          const saveData = await fetch("http://localhost:9000/todos/all", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sorted[i])
          });}
          const response2 = await fetch("http://localhost:9000/todos");
          const jsonData2 = await response2.json();
          var sorted = _.sortBy(jsonData2, "id")
        }
        setTodos(sorted);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
      getTodos();
    }, []);
  
    console.log(todos);
    
    function sakrij(){
      document.getElementById(`sakrij`).style.display = 'inline-block';
      document.getElementById(`dodaj`).style.display = 'none';
    }

    return (
    <Fragment>
      <table class="lista">
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>
                <button onClick={() => updateDone(todo.id)} className={
                  todo.done===1 ? 'Oval Done' : 'Oval'
                }>
                </button>
              </td>
              <td>
                <input className={ todo.done===1 ? 'Text-Style-2 doneTxt' : 'Text-Style-2'} value={todo.description} 
                  disabled={edit!==todo.id}/></td>
              <td>
                <i onClick={() => setEdit(todo.id)} class="fa fa-pencil"></i> 
              </td>
              <td>
                <i onClick={() => deleteTask(todo.id)} class="fa fa-trash"></i>
                <div></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="sakrij">
      <InputTodo/></div>
      <button className="Rectangle" id="dodaj" onClick={() => sakrij()}>+ New task</button>
    </Fragment>
  );
};

export default List;