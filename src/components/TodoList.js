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

    setNewTodo({ title: e.target.value });
  
  }

  function handleSubmit() {
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
      }
      return todo;
    });
    TodoState.set({
      todos
    });
  }
  //Mark todo as completed
  function completedTodo(id) {
    todos.map(todo => {
      if (todo.id === id) {
        let done = !todo.completed;
        todo.completed = done;
      }

      return todo;
    });
    TodoState.set({
      todos: todos
    });
  }
  return (
    <div className="TodoList">
        <div className="TodoListRow1">DUODEKA TodoApp</div>
        <div className="TodoListRow2">
            <TextField
                placeholder=" Add a Task"
                value={newTodo.title}
                name="title"
                onChange={addNewTodo}
                variant="outlined"> 
            </TextField>
        </div>
        <div className="TodoListRow3">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Add Todo
            </Button>
        </div>
      {todos.map(todo => {
        return (
          <div className ="spaceList" key={todo.id}>
                <div className ="spaceListCol1">
                    <Checkbox
                        type="checkbox"
                        onChange={() => completedTodo(todo.id)}
                        defaultChecked={todo.completed}
                        color="primary"
                    />
                </div>
                <div className ="spaceListCol2">
                    <TextField
                        value={todo.title}
                        name="title"
                        onChange={e => updateTodo(e.target.value, todo.id)}
                        variant="outlined" 
                        className="list"
                    ></TextField>
                </div>
                <div className ="spaceListCol3">
                    <Button variant="contained" color="primary" onClick={() => deleteTodo(todo.id)}>Delete</Button>
                </div>
          </div>
        );
      })}
    </div>
  );
}