import React from "react";
import "./welcome.css";
import img from "./bg3.jpg";
import { useStateValue } from "../../../context";

function Welcome() {
  const [{ photoUrl, name }] = useStateValue();
  return (
    <div className="wel_div">
      <img className="wel_img" src={photoUrl}></img>
      <h1 style={{ marginBottom: "2px" }} color="#393e5c">
        Welcome, {name}
      </h1>
      <p style={{ fontSize: "20px" }}>lets hash together!!</p>
    </div>
  );
}

export default Welcome;
