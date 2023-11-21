import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
		
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
	};

	const handleDeleteTasks = async () => {
		try{
			setIsDeleting(true);

			const updatedTodos = todos.filter((t, currentIndex) => index !== currentIndex
			);
			console.log("updatedTodos", updatedTodos);
			setTodos(updatedTodos);
			await syncWithApi(updatedTodos);
			await getTodos();
		} catch (error) {
			console.log("error en el handleDeleteTasks", error);
		} finally {
			setIsDeleting(false);
			
		}
	};		

	const handleDeleteTasks2 = async (index) => {
		try{
			setIsDeleting(true);
			const updatedTodos = todos.filter((t, currentIndex) => index !== currentIndex
			);
			console.log("updatedTodos", updatedTodos);
			setTodos(updatedTodos);
			await syncWithApi(updatedTodos);
			await getTodos();
		} catch (error) {
			console.log("error en el handleDeleteTasks", error);
		} finally {
			setIsDeleting(false);
			
		}
	};
	

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
	};

	const getTodos = async () => {
	  try {
		const response = await fetch(
		  "https://playground.4geeks.com/apis/fake/todos/JoseEnrique"
		);
		
		if (response.status === 404) {
			console.log("No se encontraron datos");
			await crearUsuario();
			return;
		}

		const data = await response.json();
		console.log("Fetched data:", data);

		setTodos(data || []);
		} catch (error) {
		
		console.error("Error fetching data:", error);
		}
	};

	const syncWithApi = async (updatedtodos) => {

		try {
			const response = await fetch("https://playground.4geeks.com/apis/fake/todos/JoseEnrique",
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedtodos),
			}
		);

		if (response.status !== 200) {
			return false;
		} 

			const data = await response.json();
			console.log("Sync with API response", data);
			setErrorMessage("");
			return true;
		} catch (error) {
			console.error("Error syncing with API:", error);
			setErrorMessage("Error syncing with API");
		}
	};

	const handleInputChange = (e) => {
		setInputValue(e,target.value);
	};

	const handleEnterKey = async (e) => {
		if (e.key === "Enter" && inputValue.trim() !== "") {
			const newTodos = {label: inputValue.trim(), done: false};

			if (task.some((t) => t.label === newTodos.label)) {
				setErrorMessage("Task already exists");
				return;
			}

			const updatedTodos = [...todos, newTodos];
			setInputValue("");
			const updated = await syncWithApi(updatedTodos);
			if (updated) {
				await getTodos();
			}
		}	
	};

  	return (
	<div className="container">
		<div>	
	  	<h1>My List</h1>
		</div>  
	  <ul>
		<div>
		  <input
			id="myInput"
			type="text"
			onChange={handleInputChange}
			value={inputValue}
			onKeyDown={handleEnterKey}
			placeholder="Asigna una tarea."
		  />
		</div>
  
		{todos.length === 0 ? (
		  <div className="task-counter">No tasks, add a task!</div>
		) : (
		  todos.map((item, index) => (
			<li key={index}>
			  {item}{" "}
			  <FontAwesomeIcon
				icon={faTrash}
				className="animate-icon hidden-icon"
				onClick={() => handleDeleteTasks}
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