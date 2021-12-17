import React, { useState } from "react";
import "./App.css";
import { WorldMap } from "./components/WorldMap/WorldMap";
import Navbar from "./components/Header/Navbar";
import Login from "./components/Login/Login";

function App() {
  const [authLogin, setAuthLogin] = useState(false);
  const [userinfo, setuserinfo] = useState({});
  console.log(process.env.REACT_APP_BACKEND_URL);
  const authhandler = (userinfo) => {
    setuserinfo(userinfo);
    setAuthLogin(!authLogin);
  };

  return (
    <>
      {!authLogin ? <Login onLogin={authhandler} /> : null}
      <Navbar
        onSignout={authhandler}
        userinfo={userinfo}
        authLogin={authLogin}
      />
      <WorldMap authLogin={authLogin} />
    </>
  );
}

export default App;
