import React, { useContext, useEffect } from "react";
import TodosContext from "../context";
import { useState } from "reinspect";

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

  const handleSubmit = event => {
    event.preventDefault();
    if (currentTodo.text) {
      dispatch({ type: "UPDATE_TODO", payload: todo });
    } else {
      dispatch({ type: "ADD_TODO", payload: todo });
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
