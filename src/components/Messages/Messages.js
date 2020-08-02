import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Message from "./Message/Message";
import withStyles from "@material-ui/core/styles/withStyles";
import "./Messages.css";

const styles = () => ({
  loader: {
    color: "#2979ff",
    margin: "auto"
  }
});
const Messages = ({ messages, name, classes }) => {
  return messages.length > 0 ? (
    <ScrollToBottom className="messages">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  ) : (
    <CircularProgress className={classes.loader} thickness="2.5" size="100px" />
  );
};

export default withStyles(styles)(Messages);

// {
//   onClick =
//     { this.clickHandle };
// }
// {
//   {
//        (onclick = () => {
//           console.log(document);
//           document.querySelector(".emoji-mart").style.display = "none";
//         })
//       }
// }
