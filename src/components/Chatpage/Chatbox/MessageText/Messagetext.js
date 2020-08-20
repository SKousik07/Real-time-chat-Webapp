import React from "react";
import { useStateValue } from "../../../../context";
import "./messagetext.css";
function Messagetext({ content, mid, timestamp, type }) {
  const [{ id }] = useStateValue();
  const isUser = id === mid;
  //   const time = new Date(timestamp.toDate()).toLocaleTimeString("en-US");
  return (
    <div>
      {type === 0 ? (
        <div className={`msg_container ${isUser && "msg_user"} `}>
          <div>{content}</div>
          {/* <span style={{ marginLeft: "auto", fontSize: "10px" }}>{time}</span> */}
        </div>
      ) : (
        <div className="img_container">
          <img
            src={content}
            className={`img_dis ${isUser && "img_user"} `}
          ></img>
        </div>
      )}
    </div>
  );
}

export default Messagetext;
