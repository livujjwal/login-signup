import React, { useState } from "react";
import axios from "axios";
const Login = ({setToken}) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  function handleInput(event) {
    console.log(event.target.name);
    setUser({ ...user, [event.target.name]: event.target.value });
  }
  let { email, password } = user;
  function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
      setSuccess("");
    } else if (!email.includes("@")) {
      setError("Valid email address required");
      setSuccess("");
    } else {
      axios
        .post("https://instagram-express-app.vercel.app/api/auth/login/", {
          email,
          password,
        })
        .then((response) => {
          console.log(response.data.data.token);
          setToken(response.data.data.token);
          localStorage.setItem("token",response.data.data.token)
          setSuccess("Login successfully");
          setError("");
        })
        .catch(err => {
          console.log(err.response.data.message);
          setError(err.response.data.message);
          setSuccess("");
        });
    }
  }
  return (
    <div className="login">
      <h1>Login Page</h1>
      {error && <h2 style={{ color: "red" }}>{error}</h2>}
      {success && <h2 style={{ color: "green" }}>{success}</h2>}
      <form onSubmit={handleSubmit}>
        <label>Your Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          onChange={handleInput}
        />
        <br />
        <label>Your Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          onChange={handleInput}
        />
        <br />

        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};
export default Login;
