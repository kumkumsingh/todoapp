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
        <NavBar className="firstChild"> </NavBar>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/contact" exact component={Contact} />
       
      </div>
    </BrowserRouter>
  );
}

export default App;
// Expose the GlobalState object to the window
window.TodoState = TodoState;


