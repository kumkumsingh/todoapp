import React, { useState } from "react";
import { TodoState } from "../contexts/Todo";
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
//import Checkbox from '@material-ui/core/Checkbox';
// Create a shorthand Hook for using the GlobalState
const useTodoState = () => React.useContext(TodoState);

export default function TodoList() {
  const todos = useTodoState();
  const [newTodo, setNewTodo] = useState({ title: "", completed: false });
  // Create a function which mutates GlobalState
  function addNewTodo(e) {
    console.log("checking adding task", e.target.value);
    setNewTodo({ title: e.target.value });
  }

  function handleSubmit(event) {
    console.log("submitting");
    TodoState.set({
      todos: [...todos, { ...newTodo, id: todos.length + 1 }]
    });

    setNewTodo({ title: "" });
  }
  // Delete a todo from the list of todos
  function deleteTodo(id) {
    TodoState.set({
      todos: todos.filter(todo => todo.id !== id)
    });
  }
  //Edit a Todo and modifying the state
  function updateTodo(title, id) {
    todos.map(todo => {
      if (todo.id === id) {
        todo.title = title;
        console.log("checking todo value", todo.title + "  id  " + todo.id);
      }
      return todo;
    });
    TodoState.set({
      todos: todos
    });

    console.log("checking edited todo", todos);
    //setNewTodo({ title: e.target.value });
  }
  //Mark todo as completed
  function completedTodo(id) {
    todos.map(todo => {
      if (todo.id === id) {
        let done = !todo.completed;
        todo.completed = done;
        console.log("checking after todo is marked as completed", done);
      }

      return todo;
    });
    TodoState.set({
      todos: todos
    });
  }
  return (
    <div>
    <div>DUODEKA TodoApp</div>
      <input
        placeholder=" Add a Task"
        value={newTodo.title}
        name="title"
        onChange={addNewTodo}
      ></input>
      <button type="submit" onClick={handleSubmit}>
        Add Todo
      </button>
      {todos.map(todo => {
        return (
          <div key={todo.id}>
            <div>
              <input
                type="checkbox"
                onChange={() => completedTodo(todo.id)}
                defaultChecked={todo.completed}
              />
              <input
                value={todo.title}
                name="title"
                onChange={e => updateTodo(e.target.value, todo.id)}
              ></input>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
