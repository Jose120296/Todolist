
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
		
const crearUsuario = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/JoseEnrique",
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
	
const handleDeleteTasks = async (index) => {	
		try{
			setIsDeleting(true);

			const updatedTodos = todos.filter((_, currentIndex) => index !== currentIndex);
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

const handleDeleteAll = async () => {	
	  try {
		const response = await fetch(
		  "https://playground.4geeks.com/apis/fake/todos/user/JoseEnrique",
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
		  "https://playground.4geeks.com/apis/fake/todos/user/JoseEnrique"
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
			const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/JoseEnrique",
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
		setInputValue(e.target.value);
	};

const handleEnterKey = async (e) => {	
		if (e.key === "Enter" && inputValue.trim() !== "") {
			const newTodos = {label: inputValue.trim(), done: false};

			if (todos.some((t) => todos.label === newTodos.label)) {
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

	const remainingTasks =	
		todos.filter((todos) => todos.label && todos.label.trim() !== "").length -1;
		
	useEffect(() => {
		getTodos();
	}, []);
	

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
				  placeholder="Enter a Task"
				  onChange={handleInputChange}
				  value={inputValue}
				  onKeyDown={handleEnterKey}
				  autoComplete="off"
				/>
			</div>
			<div>
			  {errorMessage && <p className="error-message">{errorMessage}</p>}
			</div>
			{remainingTasks === 0 ? (
			  <div className="task-counter">No tasks, add a task!</div>
			) : (
			todos.map((item, index) => (
			  item.label !== "example task" && (
			    <li key={index} className="task-item">
			      {item.label}
			      <FontAwesomeIcon
			        icon={faTrash}
			        className="animate-icon hidden-icon"
			        onClick={() => handleDeleteTasks(index)}
			      />
			    </li>
			  ))
			))}
			
		  </ul>
		  {remainingTasks > 0 && (
		  	<div>
				{remainingTasks} {remainingTasks === 1 ? "task" : "tasks"} left
			</div>
			)}
			<button
			  className="delete-all-button animated-button"
			  onClick={handleDeleteAll}
			  disabled={isDeleting}
			>
			  Delete All
			</button>
		</div>
	  );
	  }
	  
	  export default Home;