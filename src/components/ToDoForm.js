import React, { useContext, useEffect } from "react";
import TodosContext from "../context";
import { useState } from "reinspect";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function TodoForm() {
  const [todo, setTodo] = useState("", "todo_form");
  const {
    state: { currentTodo = {} },
    dispatch
  } = useContext(TodosContext);

  useEffect(() => {
    // check if have currentTodo
    if (currentTodo.text) {
      setTodo(currentTodo.text);
    } else {
      setTodo("");
    }

    // run useEffect only when it changes
  }, [currentTodo.id]);

  const handleSubmit = async event => {
    event.preventDefault();
    if (currentTodo.text) {
      dispatch({ type: "UPDATE_TODO", payload: todo });
    } else {
      const response = await axios.post(
        "https://hooks-api-azure.now.sh/todos",
        {
          id: uuidv4(),
          text: todo,
          complete: false
        }
      );
      dispatch({ type: "ADD_TODO", payload: response.data });
    }
    // set todo to initial value after update or added a new one
    setTodo("");
  };
  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-5">
      <input
        type="text"
        className="border-black border-solid border-2"
        onChange={event => setTodo(event.target.value)}
        value={todo}
      />
    </form>
  );
}
