import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [apiData, SetapiData] = useState([]);
  const [setShowButton] = useState(false);
		
const crearUsuario = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/apis/fake/todos/JoseEnrique",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify([]),
				}
			);


			const data = await response.json();
			console.log("Usuario Creado", data);
		} catch (error) {
			console.error("Error al crear el usuario:", error);
		}
	}

	const handleDelete = async () => {
	  try {
		const response = await fetch(
		  "https://playground.4geeks.com/apis/fake/todos/JoseEnrique",
		  {
			method: "Delete",
			headers: {
			  "Content-Type": "application/json",
			},
		  }
		);
		const data = await response.json();
		console.log(data);
		await crearUsuario();
		await getTodos();
	  } catch (error) {
		console.error("Error al crear el usuario:", error);
	  }
	}

	


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
				setShowButton(true);
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
	  {todos.length >= 5 && (
		<button
		  className="delete-all-button animated-button"
		  onClick={() => handleDelete([])}
		>
		  Delete All
		</button>
	  )}
	</div>
  );
 }

export default Home;