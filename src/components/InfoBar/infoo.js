import React from "react";

import "./InfoBar.css";

function Data({ users, open }) {
  return (
    <>
      {open ? (
        <div>
          <div className="activeContainer1">
            <nav className="navBar">
              <nav className="activeItem1">
                <b>ROOM</b>
              </nav>
              {users.map(({ name }) => (
                <nav key={name} className="activeItem1">
                  {name}
                </nav>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Data;
