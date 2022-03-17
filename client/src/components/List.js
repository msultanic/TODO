import React, {Fragment,useEffect, useState} from "react";
import InputTodo from "./InputTodo";
var _ = require('lodash');
var _ = require('lodash/core');

const List = () => {
    const [todos, setTodos] = useState([]);
  //   const [description, setDescription] = useState("");

  // const onSubmitForm = async e => {
  //   e.preventDefault();
  //   try {
  //     const body = { description };
  //     const response = await fetch("http://localhost:9000/todos", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(body)
  //     });

  //     window.location = "/";
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };
  
    const deleteTodo = async id => {
      try {
        const deleteTodo = await fetch(`http://localhost:9000/todos/${id}`, {
          method: "DELETE"
        });
  
        setTodos(todos.filter(todo => todo.id !== id));
      } catch (err) {
        console.error(err.message);
      }
    };

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
      var btn = document.getElementById("dodaj");
      // if(btn.innerText=="+ New task"){
        document.getElementById(`sakrij`).style.display = 'inline-block';
        document.getElementById(`dodaj`).style.display = 'none';

        // console.log("hej");
        // }
      // else{
      //   btn.innerText="+ New task";
      //   document.getElementById(`sakrij`).style.display = 'none';
      //   }
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
                <span className={ todo.done===1 ? 'Text-Style-2 doneTxt' : 'Text-Style-2'}>{todo.description}</span></td>
              <td>
                <button onClick={() => deleteTodo(todo.id)}>
                  Delete
                </button>
              </td>
              <td>
                <button onClick={() => deleteTodo(todo.id)}>
                  Edit
                </button>
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