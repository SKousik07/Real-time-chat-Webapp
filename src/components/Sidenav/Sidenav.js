import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "./sidenav.css";
import { auth } from "../../firebase";
import { useStateValue } from "../../context";
import { useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

function Sidenav() {
  const [{ photoUrl }] = useStateValue();
  const [active, setActive] = useState("message");
  const history = useHistory();
  const [{ usersList, id }, dispatch] = useStateValue();

  const signout = () => {
    auth.signOut();
    dispatch({
      type: "SET_COMBINED_ID",
      combinedId: null,
      selectedUser: {},
    });
  };

  return (
    <div className="side_nav">
      <div className="side_top">
        {/* <Avatar
          alt="Remy Sharp"
          src="https://i.pinimg.com/originals/f2/a8/3b/f2a83b69dad12688b47dbf2bb12b8932.jpg"
        /> */}
        <StyledBadge
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" src={photoUrl} />
        </StyledBadge>
      </div>
      <div className="side_mid">
        <div
          className={active === "message" ? "div_red" : "div_hover"}
          onClick={() => {
            history.push("/");
            setActive("message");
          }}
        >
          {/* <IconButton> */}

          <ChatOutlinedIcon className="side_icons" />

          {/* </IconButton> */}
        </div>

        <div
          className={active === "profile" ? "div_red" : "div_hover"}
          onClick={() => {
            history.push("/profile");
            setActive("profile");
          }}
        >
          <PersonOutlineOutlinedIcon className="side_icons" />
        </div>
      </div>

      <div className="side_bottom">
        <Tooltip title="Logout" placement="top">
          <div
            className={active === "logout" ? "div_red" : "div_hover"}
            onClick={signout}
          >
            <ExitToAppIcon className="side_icons" />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

export default Sidenav;
