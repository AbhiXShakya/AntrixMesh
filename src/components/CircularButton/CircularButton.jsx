import { React } from "react";
import "./CircularButton.css";

function CircularButton({ toggleGlobalCard, toggleDiscusionHandler }) {
  return (
    <>
      <div className="circle-div">
        <a href="https://discord.gg/MNbEvvPG" rel="noreferrer" target="_blank">
          <div className="circle-btn-diss">
            <i className="fas fa-comments"></i>
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
