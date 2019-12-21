import React from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import Todo from "./contexts/Todo";
import { TodoState } from "./contexts/Todo";

function App() {
  return (
    <div className="App">
      <div>DUODEKA TodoApp</div>
      <Todo Root={() => <TodoList />} />
    </div>
  );
}

export default App;

// Expose the GlobalState object to the window
window.TodoState = TodoState;
