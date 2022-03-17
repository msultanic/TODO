import React, {Fragment,useEffect, useState} from "react";
import InputTodo from "./InputTodo";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

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

  
    // const deleteTodo = id => {
    //   confirmAlert({
    //     title: 'Confirm to submit',                        // Title dialog
    //     message: 'Are you sure to do this.',               // Message dialog
    //     childrenElement: () => <div>Custom UI</div>,       // Custom UI or Component
    //     confirmLabel: 'Confirm',                           // Text button confirm
    //     cancelLabel: 'Cancel',                             // Text button cancel
    //     onConfirm: () => {deleteTask(id)},    // Action after Confirm
    //     onCancel: () => alert('Action after Cancel'),      // Action after Cancel
    //     overlayClassName: "overlay-custom-class-name"      // Custom overlay class name
    //   })
      
    // };

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
        var sorted = _.sortBy(jsonData2, "id")}
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
                  todo.done===1 ? 'Oval Done' : 'Oval' || todo.completed ? 'Oval Done' : 'Oval'
                }>
                </button>
              </td>
              <td>
                <span className={ todo.done===1 ? 'Text-Style-2 doneTxt' : 'Text-Style-2'}>{todo.description}</span></td>
              <td>
                <button onClick={() => deleteTask(todo.id)} class="btn"><i class="fa fa-pencil"></i></button>
              </td>
              <td>
                <button onClick={() => deleteTask(todo.id)} class="btn"><i class="fa fa-trash"></i></button>
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