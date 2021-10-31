import "./Discussion.css";
import { ImCross } from "react-icons/all";
import WidgetBot from "@widgetbot/react-embed";

export default function Discussion({
  toggleDiscussion,
  toggleDiscusionHandler,
}) {
  return (
    <>
      {toggleDiscussion ? (
        <div id="discussion-container">
          <div id="discussion-card">
            <WidgetBot
              server="901710432820138014"
              channel="901710432820138016"
              width="100%"
              height="100%"
            ></WidgetBot>
            <ImCross
              onClick={toggleDiscusionHandler}
              style={{
                fontSize: "15px",
                fontWeight: "100",
                cursor: "pointer",
                position: "absolute",
                top: "1.65rem",
                right: "1.6rem",
                color: "#5865F2",
              }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
