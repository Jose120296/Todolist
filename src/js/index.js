//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);


// Kicks off the process of finding <i> tags and replacing with <svg>
dom.watch();


// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import Home from "./component/home.jsx";

//render your react application
ReactDOM.render(<Home />, document.querySelector("#app"));
