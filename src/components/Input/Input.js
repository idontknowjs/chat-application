import React from "react";
import { FaMicrophone } from "react-icons/fa";
import { FaRegSmile } from "react-icons/fa";
import "./Input.css";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

class Input extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
    this.state = { emojiShow: false };
    this.state = { emojiList: [] };
    this.state = { color: "grey" };
    this.state = { isMicClicked: false };
  }
  componentDidMount() {
    const { setMessage } = this.props;
    const mic = document.querySelector(".microphone");
    const input = document.querySelector(".input");

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
      this.setState({
        color: "#2979ff",
      });
      console.log("Voice is activated.");
    };

    recognition.onend = () => {
      this.setState({
        color: "grey",
      });
    }; // When nothing is spoken by the user

    recognition.onresult = (event) => {
      this.setState({
        color: "grey",
      });

      console.log(event); //SpeechRecognitionEvent
      const current = event.resultIndex;

      const transcript = event.results[current][0].transcript;
      console.log(transcript); //Value
      input.value = input.value + " " + transcript;
      setMessage(input.value);
    };

    mic.addEventListener("click", () => {
      this.inputRef.current.focus();

      // recognition.start();
      this.setState({ isMicClicked: !this.state.isMicClicked });
      this.state.isMicClicked ? recognition.start() : recognition.stop();
    });
  }

  clickHandle = () => {
    // console.log(this.state.emojiShow);
    this.setState((prevState) => ({
      emojiShow: !prevState.emojiShow,
    }));
  };

  render() {
    const { setMessage, sendMessage, message } = this.props;

    return (
      <>
        {/* {(this.clickHandle = this.props.clickHandle)} */}
        {this.state.emojiShow ? (
          <Picker
            theme="light"
            className="emojiList" // no significance of emojiList
            set="twitter"
            perLine="8"
            showPreview="false"
            title="Pick your emoji..."
            emoji="point_up"
            sheetSize="32"
            enableFrequentEmojiSort="true"
            style={{
              //TODO:
              // display: "block",
              marginLeft: 45,
              position: "absolute",
              marginTop: 210,
              width: 319,
              height: 260,
              overflow: "hidden ",
            }}
            onSelect={(emoji) => setMessage(message + emoji.native)}
          />
        ) : null}
        <form className="form">
          <FaRegSmile
            className="smile"
            size="2rem"
            onClick={this.clickHandle}
            onBlur={this.clickHandle}
          />

          <input
            className="input"
            type="text"
            placeholder="Type a message..."
            ref={this.inputRef} // Because unless the input is focused, enter will not work
            value={message}
            // onMouseOver={(event) => setMessage(event.target.value)} //onMouseOver because value is not getting updated
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={(event) =>
              event.key === "Enter" ? sendMessage(event) : null
            }
          />

          <FaMicrophone
            className="microphone"
            size="1.7rem"
            style={{ color: this.state.color }}
          />

          <button className="sendButton" onClick={(e) => sendMessage(e)}>
            Send
          </button>
        </form>
      </>
    );
  }
}

export default Input;

// NOTE : WITHOUT REF WHEN AFTER VOICE TEXT ENTER WILL NOT WORK
// SO FOR THAT I NEED TO USE REF TO GET FOCUS ON THE INPUT
