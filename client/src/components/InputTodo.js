import React, { Fragment, useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:9000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      sakrij();
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  function sakrij(){
    document.getElementById(`sakrijj`).style.display = 'none';
  }

  return (
    <Fragment>
      <form onSubmit={onSubmitForm} id="sakrijj" class="form1">
        <input
          type="text"
          className="input1"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="Rectangle" id="addBtn">+ Add task</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
