import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "https://chat-app-server-side.herokuapp.com/"; // Server is created at port 5000

  useEffect(() => {
    const { name, room } = queryString.parse(location.search); //DESTRUCTURING
    // const data = queryString.parse(location.search);
    // console.log(location); // ?name=abc&room=xyz
    // console.log(data); // will return an object like{name:"abc", room:"xyz"}
    //console.log(name, data); //abc xyz

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    // console.log(socket); // Object

    socket.emit("join", { name, room }, (error) => {
      //EMit is used and data is sent to server side
      if (error) {
        alert(error); //Username is taken
        window.location.href = `/`;
      }
    });

    return () => {
      //Kinda when unmounting happens, part of useEffect
      socket.emit("disconnect");
      socket.off(); //This one instance will be off means that when user will be disconnected
    };
  }, [ENDPOINT, location.search]); //If present, effect will only activate if the values in the list change. // otherwise we were getting two notifs

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} users={users} />
        <Messages messages={messages} name={name} />
        {/* <Messages messages={messages} name={name} clickHandle={clickHandle} /> */}
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
