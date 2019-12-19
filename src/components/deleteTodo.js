import { TodoState } from "../contexts/Todo";

export function deleteTodo(todos, id) {
    TodoState.set({
        todos: todos.filter(todo => todo.id !== id)
    });
}


function addTodo(todos, todoItem){
    TodoState.set({
        todos: [...todos, { ...todoItem, id: todos.length + 1}]
    });
}