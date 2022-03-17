import React, {Fragment,useEffect, useState} from "react";
var _ = require('lodash');
var _ = require('lodash/core');

const List = () => {
    const [todos, setTodos] = useState([]);
  
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
    
    // function method1(id){
    //   console.log("Method 1");
    //   // var el = document.getElementById(`done{id}`).style.backgroundColor = 'green' ;
    // }

    return (
    <Fragment>
      <table class="lista">
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>
                <button onClick={() => updateDone(todo.id)} className={
                  todo.done===1 ? 'checkbox completed-checkbox' : 'checkbox'
                }>
                    Done
                </button>
              </td>
              <td>
                {todo.description}</td>
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
    </Fragment>
  );
};

export default List;