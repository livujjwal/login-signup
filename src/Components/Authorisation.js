import React, { useState } from "react";
import axios from "axios";

let newToken;
const Authorisation = ({ token }) => {
  const [joke, setJoke] = useState("");

  async function getJoke() {
    try {
        if(!token){
           newToken = localStorage.getItem("token")
        }else{
            newToken = token;
        }
      const response = await axios.get(
        "https://instagram-express-app.vercel.app/api/auth/zuku",
        {
          headers: {
            authorization: `Bearer ${newToken}`,
          },
        }
      );
      if (response) {
        console.log(response.data.data.message);
        setJoke(response.data.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function logout() {
    try {
      const response = await axios.delete(
        "https://instagram-express-app.vercel.app/api/auth/logout",
        {
          headers: {
            authorization: `Bearer ${newToken}`,
          },
        }
      );
      
      localStorage.removeItem("token")
    //   console.log(response.data.message);
    alert(response.data.message);
    setJoke("")
    } catch (err) {
      alert(err);
    }
  }
  return (
    <div className="auth">
      {/* <h1>Authorisation Page</h1> */}
      <button onClick={getJoke}>Get Joke</button>
      <p>{joke}</p>
      <button className="logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
};
export default Authorisation;
