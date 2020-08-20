import React from "react";
import Sidenav from "../Sidenav/Sidenav";
import Chatpage from "../Chatpage/Chatpage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./mainpage.css";
import Profile from "../Profile/Profile";

function Mainpage() {
  return (
    <div className="main_page" style={{ display: "flex" }}>
      <Sidenav />
      <Switch>
        <Route exact path="/">
          <Chatpage />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </div>
  );
}

export default Mainpage;
