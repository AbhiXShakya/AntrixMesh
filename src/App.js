import React, { useState } from "react";
import "./App.css";
import { WorldMap } from "./components/WorldMap/WorldMap";
import Navbar from "./components/Header/Navbar";
import Login from "./components/Login/Login";

function App() {
  const [authlogin, setauthlogin] = useState(true);
  const [userinfo, setuserinfo] = useState({});

  const authhandler = (userinfo) => {
    setuserinfo(userinfo);
    setauthlogin(!authlogin);
  };

  return (
    <>
      {!authlogin ? <Login onLogin={authhandler} /> : null}
      <Navbar
        onSignout={authhandler}
        userinfo={userinfo}
        authlogin={authlogin}
      />
      <WorldMap authlogin={authlogin} />
    </>
  );
}

export default App;
