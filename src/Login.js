import React, { useState } from "react";

// if no arrow function, can write EXPORT DEFAULT on front
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleSubmit = event => {
    // make sure the page is not reloaded when submit content of the form
    event.preventDefault();

    const userData = {
      username,
      password
    };

    setUser(userData);
  };
  return (
    <div
      style={{
        textAlign: "center"
      }}
    >
      <h2> Login</h2>
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
          onChange={event => setUsername(event.target.value)}
          value={username}
        />
        <input
          type="password"
          placeholder="password"
          onChange={event => setPassword(event.target.value)}
          value={password}
        />
        <button type="submit">Submit</button>
      </form>
      {user && JSON.stringify(user, null, 2)}
    </div>
  );
}
