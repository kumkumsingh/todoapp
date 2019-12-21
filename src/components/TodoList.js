import React, { useState } from "react";
import { TodoState } from "../contexts/Todo";
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
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

  function handleSubmit() {
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
    <div className="TodoList">
    <div className="TodoListText">DUODEKA TodoApp</div>
      <TextField
        placeholder=" Add a Task"
        value={newTodo.title}
        name="title"
        onChange={addNewTodo}
        variant="outlined" 
      ></TextField>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Add Todo
      </Button>
      {todos.map(todo => {
        return (
          <div className ="spaceList" key={todo.id}>
            <div>
              <Checkbox
                type="checkbox"
                onChange={() => completedTodo(todo.id)}
                defaultChecked={todo.completed}
                color="primary"
              />
              <TextField
                value={todo.title}
                name="title"
                onChange={e => updateTodo(e.target.value, todo.id)}
                variant="outlined" 
              ></TextField>
              <Button variant="contained" color="primary" onClick={() => deleteTodo(todo.id)}>Delete</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
