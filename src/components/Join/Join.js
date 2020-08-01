import React, { useState } from "react";
import { Link } from "react-router-dom";
import chatGif from "./Chat.gif";
import logo from "./logo.png";

import "./Join.css";

function SignIn() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <>
      <div className="joinOuterContainer">
        <img alt="LOGO" src={logo} className="logo" />
        <img alt="Online Icon" src={chatGif} className="chatGif" />

        <div className="joinInnerContainer">
          <h1 className="titleJoin">
            R<span>ealtime</span> C<span>hat</span> A<span>pplication</span>
          </h1>
          <h1 className="heading">Join</h1>
          <div>
            <input
              placeholder="Name"
              className="joinInput"
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Room"
              className="joinInput mt-20"
              type="text"
              onChange={(event) => setRoom(event.target.value)}
              onKeyPress={(event) =>
                event.key === "Enter"
                  ? (window.location.href = `/chat?name=${name}&room=${room}`)
                  : null
              }
            />
          </div>
          <Link
            onClick={(e) => (!name || !room ? e.preventDefault() : null)}
            to={`/chat?name=${name}&room=${room}`}
          >
            <button className={"button mt-20"} type="submit">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignIn;
