import { v4 as uuidv4 } from "uuid";

export default function reducer(state, action) {
  switch (action.type) {
    case "GET_TODOS":
      return {
        ...state,
        todos: action.payload
      };
    case "ADD_TODO":
      // if empty input field added
      // if (!action.payload) {
      //   return state;
      // }

      // // find boolean with comparison
      // if (state.todos.findIndex(t => t.text === action.payload) > -1) {
      //   return state;
      // }
      // add new todo to Todos list
      const addedTodos = [...state.todos, action.payload];
      return {
        // spread state
        ...state,
        // update todos to new todos
        todos: addedTodos
      };
    case "SET_CURRENT_TODO":
      return {
        // spread in and copy all values in todos array
        ...state,
        currentTodo: action.payload
      };
    case "TOGGLE_TODO":
      const toggledTodos = state.todos.map(t =>
        t.id === action.payload.id ? action.payload : t
      );
      return {
        ...state,
        todos: toggledTodos
      };

    case "UPDATE_TODO":
      // if empty input field updated
      if (!action.payload) {
        return state;
      }

      // find boolean with comparison
      if (state.todos.findIndex(t => t.text === action.payload) > -1) {
        return state;
      }
      const updatedTodo = { ...state.currentTodo, text: action.payload };
      const updatedTodoIndex = state.todos.findIndex(
        t => t.id === state.currentTodo.id
      );

      const updatedTodos = [
        ...state.todos.slice(0, updatedTodoIndex),
        updatedTodo,
        ...state.todos.slice(updatedTodoIndex + 1)
      ];
      return {
        ...state,
        currentTodo: {},
        todos: updatedTodos
      };
    case "REMOVE_TODO":
      const filteredTodos = state.todos.filter(t => t.id !== action.payload.id);

      const isRemovedToDo =
        state.currentTodo === action.payload ? {} : state.currentTodo;

      return {
        ...state,
        currentTodo: isRemovedToDo,
        todos: filteredTodos
      };

    default:
      return state;
  }
}
