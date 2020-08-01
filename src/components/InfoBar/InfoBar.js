import React, { useState } from "react";

import { BsFillPersonLinesFill } from "react-icons/bs";
import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";

import Data from "./infoo";
import "./InfoBar.css";

const InfoBar = ({ room, users }) => {
  const [open, setOpen] = useState(false);
  function DropDownMenu() {
    return <Data users={users} open={open} />;
  }
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
        <h3>Room: {room}</h3>
      </div>
      <div className="rightInnerContainer">
        <BsFillPersonLinesFill
          className="onlinePeople"
          size="2rem"
          onClick={() => {
            setOpen(!open);
          }}
        />
        {open && <DropDownMenu />}

        <a href="/">
          <img src={closeIcon} alt="close icon" />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
