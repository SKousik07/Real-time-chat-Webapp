import React, { useState } from "react";
import Chatbox from "./Chatbox/Chatbox";
import Userlist from "./Userslist/Userlist";
import "./chatpage.css";
import Welcome from "./Welcome/Welcome";
import { useStateValue } from "../../context";
function Chatpage() {
  const [{ combinedId }] = useStateValue();

  // console.log(combinedId);
  return (
    <div className="chat_panel">
      <Userlist />

      {combinedId ? <Chatbox /> : <Welcome />}
    </div>
  );
}

export default Chatpage;
