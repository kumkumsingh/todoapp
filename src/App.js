import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { Route, BrowserRouter } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from './components/Home'
import { TodoState } from "./contexts/Todo";

function App() {
  return (
    <BrowserRouter>
      <div className="App-header">
        <div className="flexColumns"><NavBar> </NavBar></div>
        <div className="flexColumns"><Route path="/" exact component={Home} /></div>
        <div className="flexColumns"><Route path="/about" exact component={About} /></div>
        <div className="flexColumns"><Route path="/contact" exact component={Contact} /></div>
        <div className="flexColumns"></div>
      </div>
    </BrowserRouter>
  );
}

export default App;
// Expose the GlobalState object to the window
window.TodoState = TodoState;


