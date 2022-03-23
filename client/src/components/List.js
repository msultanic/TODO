import React, { Fragment, useEffect, useState } from "react";
import InputTodo from "./InputTodo";
import Confirm from "./Confirm";
import Axios from "axios";
import { Circles } from "react-loader-spinner";

const List = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(null);
  const [hovered, setHovered] = useState(0);
  const [dialogModalOpen, setDialogModalOpen] = useState(0);
  const [isHideNewTaskBtn, setIsHideNewTackButton] = useState(false);
  const [position, setPosition] = useState({});

  const updateDone = async (id) => {
    try {
      await Axios.put(`${process.env.REACT_APP_API_URL}/todos/done/${id}`);
      getTodos();
    } catch (err) {
      console.error(err.message);
    }
  };
  const updateDoneDescription = async (id, description) => {
    try {
      await Axios.put(`${process.env.REACT_APP_API_URL}/todos/${id}`, {
        description,
      });
      getTodos();
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    setIsLoading(true);
    try {
      const { data: jsonData } = await Axios.get(
        `${process.env.REACT_APP_API_URL}/todos`
      );

      var sorted = jsonData.sort((a, b) => a.id - b.id);

      // console.log(sorted);
      if (sorted.length === 0) {
        let { data } = await Axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        data = data.slice(0, 20);

        for (let itm of data) {
          await Axios.post(`${process.env.REACT_APP_API_URL}/todos/all`, itm);
        }
      }

      setTodos(sorted);
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  //  console.log(todos);

  const toggleDialogModal = async (confirm) => {
    if (confirm) {
      try {
        await Axios.delete(
          `${process.env.REACT_APP_API_URL}/todos/${dialogModalOpen}`
        );
        await getTodos();
      } catch (err) {
        console.error(err.message);
      }
    }
    setDialogModalOpen(0);
  };

  const onChane = (e) => {
    let newTodoIndex = todos.findIndex((e) => e.id === edit);
    let newTodos = [...todos];
    newTodos[newTodoIndex].description = e.target.value;
    setTodos(newTodos);
  };

  return (
    <Fragment>
      <div
        className="container"
        onClick={() => {
          // edit && setEdit(null);
          dialogModalOpen && setDialogModalOpen(null);
        }}
      >
        <div className="to-do">
          <div className="to-do__header">
            <div className="h-menu">
              <i className="fa  fa-bars fa-lg"></i>
            </div>
            <h2 className="header-heading">Motoff To-do List</h2>
          </div>
          <div
            className="to-do__container"
            onScroll={() => dialogModalOpen && setDialogModalOpen(null)}
          >
            {isLoading ? (
              <div className="center">
                <Circles color="#00BFFF" height={50} width={50} />
              </div>
            ) : !todos.length ? (
              <p>There is no todos yet, Create new one</p>
            ) : (
              todos.map((todo, i) => (
                <div
                  key={`todo_${i}`}
                  className={`task ${todo.id}`}
                  onMouseEnter={() => setHovered(todo.id)}
                  onMouseLeave={() => setHovered(0)}
                >
                  <button
                    onClick={() => {
                      setEdit(null);
                      updateDone(todo.id);
                    }}
                    className={
                      todo.completed
                        ? "task__complete-button Done"
                        : "task__complete-button"
                    }
                  ></button>
                  <input
                    id={`${todo.id}`}
                    onBlur={(e) => {
                      updateDoneDescription(todo.id, e.target.value);
                      setEdit(null);
                    }}
                    type="text"
                    className={
                      todo.id === edit
                        ? "task__input active js-task-input text"
                        : dialogModalOpen === todo.id
                        ? "task__input js-task-input deleteTxt"
                        : "task__input js-task-input"
                    }
                    onChange={onChane}
                    value={
                      todo.description.length > 20 && edit !== todo.id
                        ? todo.description.slice(0, 20) + "..."
                        : todo.description
                    }
                    disabled={edit !== todo.id}
                  />
                  {hovered === todo.id ||
                  dialogModalOpen === todo.id ||
                  edit === todo.id ? (
                    <>
                      <i
                        style={
                          edit === todo.id ? { background: "#eaebec" } : {}
                        }
                        onClick={() => {
                          setEdit(todo.id);
                          setIsHideNewTackButton(false);
                          if (edit === todo.id) setEdit(null);
                          // document.getElementById(`${todo.id}`).focus();
                        }}
                        className="fa fa-pencil"
                      ></i>
                      <i
                        style={
                          dialogModalOpen === todo.id
                            ? { background: "#eaebec" }
                            : {}
                        }
                        onClick={(e) => {
                          setEdit(null);
                          setIsHideNewTackButton(false);
                          if (e) {
                            var rect = e.target.getBoundingClientRect();
                            // console.log(
                            //   rect.top,
                            //   rect.right,
                            //   rect.bottom,
                            //   rect.left
                            // );
                            setPosition(rect);
                          }
                          setDialogModalOpen(todo.id);
                        }}
                        className="fa fa-trash"
                      ></i>
                    </>
                  ) : null}
                </div>
              ))
            )}
          </div>
          {dialogModalOpen ? (
            <Confirm
              position={position}
              toggleDialogModal={toggleDialogModal}
            />
          ) : null}
        </div>
      </div>
      {isHideNewTaskBtn ? (
        <div>
          <InputTodo />
        </div>
      ) : (
        <button
          className="Rectangle"
          onClick={() => {
            setEdit(null);
            setDialogModalOpen(null);
            setIsHideNewTackButton(true);
          }}
        >
          + New task
        </button>
      )}
    </Fragment>
  );
};

export default List;
