import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message/Message";

import "./Messages.css";

const Messages = ({ messages, name }) => {
  return (
    <ScrollToBottom className="messages">
      {/* TODO: */}
      {/* onClick=
      {this.clickHandle} */}
      {/* {
        (onclick = () => {
          console.log(document);
          document.querySelector(".emoji-mart").style.display = "none";
        })
      } */}
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
