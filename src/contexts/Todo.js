import React, { createContext, Component } from "react";
//import uuid from "uuid/v1";

const initialTodoState = [{ title: "cleaning room", id: 1 }]

// Create a Context for the (global todos) State
export const TodoState = createContext();

export default class Todo extends Component {
  constructor(props) {
    super(props);

    // Set the initial (todos) State
    this.state = {
      todos: initialTodoState || {}
    };
  }
  // Expose the setTodos function to the Todos object
  componentDidMount() {
    TodoState.set = this.setTodoState;
  }

  setTodoState = (task = {}) => {
    const { todos } = this.state;

    // Loop over the data items by key, only updating those which have changed
    Object.keys(task).forEach(key => {
      todos[key] = task[key];
    });

    // Update the state with the new State
    this.setState(todos);
  };
  render() {
    const { todos } = this.state;
    const { Root } = this.props;
    return (
      // Pass the current value of GlobalState, based on this components' State, down
      <TodoState.Provider value={todos}>
        <Root />
      </TodoState.Provider>
    );
  }
}
