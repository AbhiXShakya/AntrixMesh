import "./PopCard.css";
import { ImCross } from "react-icons/im";

export default function PopCard({ children, toggleCard }) {
  return (
    <>
      <div id="popcard-container">
        <div id="popcard">
          <ImCross
            onClick={toggleCard}
            style={{
              fontSize: "15px",
              fontWeight: "100",
              cursor: "pointer",
              position: "absolute",
              top: "0.8rem",
              right: "0.8rem",
              color: "#5865F2",
              zIndex: "1",
            }}
          />
          {children}
        </div>
      </div>
    </>
  );
}
