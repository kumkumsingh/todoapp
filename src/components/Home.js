import React from 'react'
import TodoList from './TodoList';
import Todo from "../contexts/Todo";
import { TodoState } from "../contexts/Todo";

export default function Home() {
    return (
        <div>
        <Todo Home={() => <TodoList className="secondChild" />}>
        </Todo> 
        </div>
    )
}
// Expose the GlobalState object to the window
window.TodoState = TodoState;