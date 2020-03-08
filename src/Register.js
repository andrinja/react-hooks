import React, { useState } from "react";

// create intial state outside of component to clear form inputs when click Submit
const initialFormState = {
  username: "",
  email: "",
  password: ""
};
export default function Register() {
  const [form, setForm] = useState(initialFormState);

  const [user, setUser] = useState(null);

  const handleChange = event => {
    setForm({
      // need to provide rest of the content - OBJECT SPREAD OPERATOR
      //overrides the previous value of the state according to its respective name
      ...form,
      //updates only single peace at the state at a time
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setUser(form);
    setForm(initialFormState);

    // clear state after submit
  };

  return (
    <div
      style={{
        textAlign: "center"
      }}
    >
      <h2> Register</h2>
      <form
        action=""
        style={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center"
        }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
          value={form.username}
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          value={form.email}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          value={form.password}
        />
        <button type="submit">Submit</button>
      </form>

      {user && JSON.stringify(user, null, 2)}
    </div>
  );
}
