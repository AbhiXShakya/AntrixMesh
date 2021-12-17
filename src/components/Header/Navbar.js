import React, { useState } from "react";
import "./Navbar.css";
import { signOut } from "firebase/auth";
import { fireAuth } from "../Login/firebaseConfig";
import CryptoBanner from "../CryptoBanner/CryptoBanner";
import { Pages } from "../Pages/Pages";

function Navbar({ onSignout, userinfo, authLogin }) {
  const [ProfileCard, setProfileCard] = useState(false);
  const [pageClicked, setPageClicked] = useState(undefined);
  const [togglePage, setTogglePage] = useState(false);

  const displayPage = (page) => {
    if (authLogin) {
      setTogglePage(!togglePage);
      setPageClicked(page);
    }
  };

  const pageHandler = () => {
    if (authLogin) {
      setTogglePage(!togglePage);
    }
  };

  const profilecardhandler = () => {
    if (authLogin) {
      let element = document.getElementById("profile-container");
      element.classList.toggle("profile-open");
      setProfileCard(!ProfileCard);
    }
  };
  const onSignoutHandler = () => {
    signOut(fireAuth)
      .then(() => {
        profilecardhandler();
        console.clear();
        alert("You have been logged out successfully");
        onSignout();
      })
      .catch((error) => {
        // console.log(error);
        alert("Not able to signout");
      });
  };

  return (
    <>
      {togglePage ? (
        <Pages pageClicked={pageClicked} pageHandler={pageHandler} />
      ) : null}
      <div className="nav-container">
        <nav>
          <h2>AntrixMesh</h2>
          <div className="nav-sub-container">
            <input id="navcheck" type="checkbox" />
            <label htmlFor="navcheck" className="nav-btn">
              <i className="fas fa-bars"></i>
            </label>
            <ul>
              <li
                onClick={() => {
                  displayPage("about");
                }}
              >
                About
              </li>
              <li
                onClick={() => {
                  displayPage("contact");
                }}
              >
                Contact
              </li>
              <li
                onClick={() => {
                  displayPage("donate");
                }}
              >
                Donate
              </li>
            </ul>
            <div className="profile-pic" onClick={profilecardhandler}>
              {authLogin ? (
                <img src={userinfo && userinfo.photoURL} alt=""></img>
              ) : (
                <i className="far fa-user"></i>
              )}
            </div>
          </div>
        </nav>
      </div>
      <CryptoBanner />
      <div id="profile-container">
        <div id="pcard-overlay" onClick={profilecardhandler} />
        <div className="profile-card">
          <label className="close-pCard" onClick={profilecardhandler}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </label>
          <div className="profile-picture">
            <img src={userinfo && userinfo.photoURL} alt=""></img>
          </div>
          <h2 className="profile-name">{userinfo && userinfo.displayName}</h2>
          <p className="profile-email">{userinfo && userinfo.email}</p>
          <button
            className="signout-btn"
            onClick={() => {
              onSignoutHandler();
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
