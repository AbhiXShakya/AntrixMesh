import { React } from "react";
import "./CircularButton.css";
import { SiDiscord } from "react-icons/si";

function CircularButton({ toggleGlobalCard, toggleDiscusionHandler }) {
  return (
    <>
      <div className="circle-div">
        <a
          href="https://discord.gg/5jq4UXYyp3"
          rel="noreferrer"
          target="_blank"
        >
          <div
            className="circle-btn-diss"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SiDiscord size={25} />
          </div>
        </a>
        <div className="circle-btn" onClick={toggleGlobalCard}>
          <i className="fas fa-globe-americas"></i>
        </div>
      </div>
    </>
  );
}

export default CircularButton;
