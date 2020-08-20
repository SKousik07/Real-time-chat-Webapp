import React from "react";
import { Avatar } from "@material-ui/core";
import "./listitem.css";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
function Listitem({ name, about, photoUrl, selectUser, id }) {
  return (
    <div className="card_border">
      <CardActionArea
        className="user_cardarea"
        onClick={() => {
          selectUser(id, name, photoUrl, about);
        }}
      >
        <div className="user_card">
          <div className="user_avatar">
            <Avatar alt={name} src={photoUrl} />
          </div>
          <div className="user_detail">
            <div className="user_txt">
              <strong>{name}</strong>
            </div>
            <div>{about}</div>
          </div>
        </div>
      </CardActionArea>
    </div>
  );
}

export default Listitem;
