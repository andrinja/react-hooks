import React, { useContext, useEffect, useState } from "react";
import { useReducer } from "reinspect";
import ReactDOM from "react-dom";
import { StateInspector } from "reinspect";
//import App from "./AppClass";
//import App from "./AppFunction";
//import App from "./Login";
//import App from "./Register";
//import App from "./DataFetch";
//import App from "./Props";
import * as serviceWorker from "./serviceWorker";

import TodosContext from "./context";
import todosReducer from "./reducer";

import ToDoList from "./components/TodoList";
import TodoForm from "./components/ToDoForm";
import axios from "axios";

// create custom hook
// custom hook manages it own state
const useAPI = endpoint => {
  // in custom hook you can use other API endpoints so keep names in the hook generic
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // make request for todos
  const getData = async () => {
    const response = await axios.get(endpoint);
    setData(response.data);
  };

  return data;
};

const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(
    todosReducer,
    initialState,
    state => state,
    "help"
  );

  // pass endpoint - get request
  const savedTodos = useAPI("https://hooks-api-azure.now.sh/todos");

  useEffect(() => {
    dispatch({
      type: "GET_TODOS",
      payload: savedTodos
    });

    // reload only savedTodos changed
  }, [savedTodos]);

  return (
    <StateInspector name="App">
      <TodosContext.Provider value={{ state, dispatch }}>
        <TodoForm />
        <ToDoList />
      </TodosContext.Provider>
    </StateInspector>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// export const UserContext = React.createContext();
// const username = "Andra";

// ReactDOM.render(
//   <UserContext.Provider value={username}>
//     <App />
//   </UserContext.Provider>,
//   document.getElementById("root")
// );

// if (module.hot) {
//   module.hot.accept();
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
