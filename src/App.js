import React, { useState }  from "react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Authorisation from "./Components/Authorisation";
import "./App.css"
const App = () =>{
    const [token,setToken] = useState("")
    return(<div>
<Signup setToken={setToken}/>
<Login setToken={setToken}/>
        <Authorisation token={token}/>
    </div>)
}
export default App;