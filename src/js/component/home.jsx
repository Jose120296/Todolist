import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

//create your first component
const Home = () => {
	const[inputValue, SetInputValue] = useState("");
	const[todos, SetTodos ]= useState ([]);

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
					onChange={(e)=> SetInputValue(e.target.value)} 
					value={inputValue}
					onKeyPress={(e) => { 
						if (e.key=== "Enter") {
							SetTodos(todos.concat(inputValue)); 
							SetInputValue("") 
						}
					}}
					placeholder="What do you need to do?"></input>
				</li>
				{todos.map ((item, index) => (
                    <li key={index}>
                    {item}{" "}
                    <FontAwesomeIcon 
                      icon={faTrash}
                      className="animate-icon"
                      onClick={() =>
                        SetTodos(
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
