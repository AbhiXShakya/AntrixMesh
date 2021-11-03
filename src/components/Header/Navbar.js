import React, { useState } from "react";
import "./Navbar.css";
import { GoogleLogout } from "react-google-login";
import CryptoBanner from "../CryptoBanner/CryptoBanner";
import { Pages } from "../Pages/Pages";

const clientId =
  "666743102967-humikr8ibktjr2oeeb3pmldbdf9qmvol.apps.googleusercontent.com";

function Navbar({ onSignout, userinfo, authlogin }) {
  const [ProfileCard, setProfileCard] = useState(false);
  const [pageClicked, setPageClicked] = useState(undefined);
  const [togglePage, setTogglePage] = useState(false);
  const displayPage = (page) => {
    setPageClicked(page);
    setTogglePage(!togglePage);
  };

  const pageHandler = () => {
    setTogglePage(!togglePage);
  };

  const profilecardhandler = () => {
    let element = document.getElementById("profile-container");
    element.classList.toggle("profile-open");
    setProfileCard(!ProfileCard);
  };
  const onSignoutSuccess = () => {
    profilecardhandler();
    alert("You have been logged out successfully");
    console.clear();
    onSignout();
  };

  return (
    <>
      {togglePage ? (
        <Pages pageClicked={pageClicked} pageHandler={pageHandler} />
      ) : null}
      <div className="nav-container">
        <nav>
          <h2>CryptoMap</h2>
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
              {authlogin ? (
                <img src={userinfo && userinfo.imageUrl} alt=""></img>
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
            <img src={userinfo && userinfo.imageUrl} alt=""></img>
          </div>
          <h2 className="profile-name">{userinfo && userinfo.name}</h2>
          <p className="profile-email">{userinfo && userinfo.email}</p>
          <div className="signout-btn">
            <GoogleLogout
              clientId={clientId}
              buttonText="Sign Out"
              onLogoutSuccess={onSignoutSuccess}
            ></GoogleLogout>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
