import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

//create your first component
const Home = () => {
	const[inputValue, setInputValue] = useState("");
	const[todos, setTodos ]= useState ([]);

	//Add into array => concat
	//Delate from array => filter 
	//Update => map

	return (
		<div className="container">
			<h1>My List</h1>
			<ul>
				<li>
					<input 
					id="myInput"
					type="text" 
					onChange={(e)=> setInputValue(e.target.value)} 
					value={inputValue}
					onKeyPress={(e) => { 
						if (e.key=== "Enter") {
							setTodos(todos.concat(inputValue)); 
							setInputValue("") 
						}
					}}
					placeholder="Asigna una tarea."></input>
				</li>
				{todos.map ((item, index) => (
                    <li key={index}>
                    {item}{" "}
                    <FontAwesomeIcon 
                      icon={faTrash}
                      className="animate-icon hidden-icon"
                      onClick={() =>
                        setTodos(
                            todos.filter(
                                (t, currentIndex) => 
                                index !== currentIndex))
                      }
                    />
                    </li>
				))}
			</ul>
			<div>{todos.length} tasks</div>
		</div>
	);
};


export default Home;