import React from "react";
import "./SelectCountry.css";
import { countries } from "../../../data/countries";

export default function SelectCountry({
  toggleCountryModal,
  setSelectedCountry,
  setCountryIcon,
}) {
  const liOnClick = (option) => {
    let countryCode;
    if (option.code === "global") {
      countryCode = undefined;
    } else {
      countryCode = option.code;
    }
    setSelectedCountry({ name: option.label, code: countryCode });
    if (option.code === "global") {
      setCountryIcon("https://graph.org/file/3459cff6cc24335197457.png");
    } else {
      setCountryIcon(
        `https://flagcdn.com/w20/${option.code.toLowerCase()}.png`
      );
    }

    toggleCountryModal();
  };

  return (
    <>
      <div className="sc-overlay" onClick={toggleCountryModal}></div>
      <div className="sc-container">
        <div className="sc-card">
          <ul className="sc-ul" style={{ listStyleType: "none" }}>
            {countries
              .map((option) => (
                <li
                  key={option.code}
                  onClick={() => {
                    liOnClick(option);
                  }}
                  stlye={{ position: "relative" }}
                >
                  {option.code === "global" ? (
                    <>
                      <img
                        className="global-icon"
                        loading="lazy"
                        src="https://graph.org/file/3459cff6cc24335197457.png"
                        alt=""
                      />{" "}
                      <span style={{ marginLeft: "1.82rem" }}>Global</span>
                    </>
                  ) : (
                    <>
                      <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        alt=""
                      />{" "}
                      &nbsp;{option.label}
                    </>
                  )}
                </li>
              ))
              .sort()}
          </ul>
        </div>
      </div>
    </>
  );
}
