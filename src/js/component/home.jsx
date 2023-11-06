import React, {useState} from "react";

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
					<input type="text" 
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
					<i
					  className="fa-solid fa-trash my-icon animate-icon"
					  onClick={() =>
						setTodos(
							todos.filter(
								(t, currentIndex) => 
								index !== currentIndex))
					  }
					></i>
				  	</li>
				))}
			</ul>
			<div>{todos.length} tasks</div>
		</div>
	);
};

export default Home;
