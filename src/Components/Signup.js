import axios from "axios";
import React, { useState } from "react";

const Signup = ({setToken}) => {
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
      setSuccess("");
    } else if (password !== confirmPassword) {
      setError("Password not match ");
      setSuccess("");
    } else if (!email.includes("@")) {
      setError("Valid email address required");
      setSuccess("");
    } else {
      axios
        .post("https://instagram-express-app.vercel.app/api/auth/signup", {
          name,
          email,
          password,
        })
        .then((response) => {
          console.log(response.data.data.token);
          setToken(response.data.data.token);
          localStorage.setItem("token",response.data.data.token)
          setSuccess("Signup successfully");
          setError("");
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setSuccess("");
          setError(err.response.data.message);
        });
    }
  }
  return (
    <div className="signup">
      <h1>Signup Page</h1>
      {error && <h2 style={{ color: "#FF0000" }}>{error}</h2>}
      {success && <h2 style={{ color: "green" }}>{success}</h2>}
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
