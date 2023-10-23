import axios from "axios";
import React, { useState } from "react";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  function handleInput(event) {
    console.log(event.target.name);
    setUser({ ...user, [event.target.name]: event.target.value });
  }
  let { name, email, password, confirmPassword } = user;
  function handleSubmit(event) {
    event.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
    } else if (password !== confirmPassword) {
      setError("Password not match required");
    } else if (!email.includes("@")) {
      setError("Valid email address required");
    } else {
      axios
        .post("https://instagram-express-app.vercel.app/api/auth/signup", {
          name,
          email,
          password,
        })
        .then((response) => console.log(response.data));
    }
  }
  return (
    <div>
      <h1>Signup Page</h1>
      {error && <h2 style={{ color: "red" }}>{error}</h2>}
      <form onSubmit={handleSubmit}>
        <label>Your Name</label>
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          onChange={handleInput}
        />
        <br />
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
        <label>Your Confirm Password</label>
        <input
          type="password"
          placeholder="Enter Confirm Password"
          name="confirmPassword"
          onChange={handleInput}
        />
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};
export default Signup;
