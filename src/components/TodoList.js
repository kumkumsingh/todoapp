import React, { useState } from "react";
import { TodoState } from "../contexts/Todo";
// Create a shorthand Hook for using the GlobalState
const useTodoState = () => React.useContext(TodoState);

export default function TodoList() {
    const todos = useTodoState();
    const [newTodo, setNewTodo] = useState({ title: '' })
  // Create a function which mutates GlobalState
  function updateNewTodo(e) {
    console.log("checking adding task", e.target.value);
    setNewTodo({ title: e.target.value })
}

function handleSubmit(event){
    console.log('submitting')
    // console.log("checking global state", TodoState.set({ count: 5 }));

    TodoState.set({
        todos: [...todos, { ...newTodo, id: todos.length + 1}]
    });

    setNewTodo({ title: ''})
}

function deleteTodo(id){
    TodoState.set({
        todos: todos.filter(todo => todo.id !== id)
    })
}
  console.log(newTodo)
  return (
    <div>
      <div>Todos</div>
      <input
        placeholder=" Add a Task"
        value={newTodo.title}
        name="task"
        onChange={updateNewTodo}
      ></input>
      <button type="submit" onClick={handleSubmit}>
        Add Todo
      </button>
      { todos.map(todo => {
          return <div key={todo.id}>
            <h1>{todo.title}</h1>
            <button onClick={() => deleteTodo(todo.id)}>Done</button>
          </div>
      })}
    </div>
  );
}
