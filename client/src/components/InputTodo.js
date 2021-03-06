import React, { Fragment, useState } from "react";
import Axios from "axios";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await Axios.post(`${process.env.REACT_APP_API_URL}/todos`, {
        description,
      });
      sakrij();
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  function sakrij() {
    document.getElementById(`sakrijj`).style.display = "none";
  }

  return (
    <Fragment>
      <form onSubmit={onSubmitForm} id="sakrijj" className="form1">
        <input
          type="text"
          className="input1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="Rectangle" id="addBtn">
          + Add task
        </button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
