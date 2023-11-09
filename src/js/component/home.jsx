import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  return (
    <div className="container">
      <h1>My List</h1>
      <ul>
        <li>
          <input
            id="myInput"
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setTodos(todos.concat(inputValue));
                setInputValue("");
              }
            }}
            placeholder="Asigna una tarea."
          />
        </li>

        {todos.length === 0 ? (
          <div className="task-counter">No tasks, add a task!</div>
        ) : (
          todos.map((item, index) => (
            <li key={index}>
              {item}{" "}
              <FontAwesomeIcon
                icon={faTrash}
                className="animate-icon hidden-icon"
                onClick={() =>
                  setTodos(todos.filter((t, currentIndex) => index !== currentIndex))
                }
              />
            </li>
          ))
        )}
      </ul>
      <div>{todos.length} tasks</div>
    </div>
  );
};

export default Home;
