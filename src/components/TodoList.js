import React, { useState } from "react";
import { TodoState } from "../contexts/Todo";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
// Create a shorthand Hook for using the GlobalState
const useTodoState = () => React.useContext(TodoState);

export default function TodoList() {
  const todos = useTodoState();
  const [newTodo, setNewTodo] = useState({
    title: "",
    completed: false,
    editItem: false
  });
  // Create a function which mutates GlobalState
  function addNewTodo(e) {
    console.log("checking adding task", e.target.value);
    setNewTodo({ title: e.target.value });
  }
  //function to add new todos to the globa todoState
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
  function updateTodo(id) {
    const filteredItems = todos.filter(todo => todo.id !== id);
    const findItem = todos.find(todo => todo.id === id);
    TodoState.set({
      todos: filteredItems
    });
    setNewTodo({ title: findItem.title,
        editItem:true
    });

    console.log("checking edited todo", todos);
  }
  //Mark todo as completed
  function completedTodo(id) {
    todos.map(todo => {
      if (todo.id === id) {
        const done = !todo.completed;
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
        {newTodo.editItem ? 'Edit Todo':'Add Todo'}
      </Button>
      {todos.map(todo => {
        return (
          <div className="spaceList" key={todo.id}>
            <div id="todo-results">
              <Checkbox
                type="checkbox"
                onChange={() => completedTodo(todo.id)}
                defaultChecked={todo.completed}
                color="primary"
              />
              <div>{todo.title}</div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => updateTodo(todo.id)}
              >
                Edit
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
