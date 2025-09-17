import { useState, createContext, useEffect } from "react";
import UserService from "../services/UserService";
import { CometChatUIKit } from "@cometchat/chat-uikit-react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { json } from "react-router-dom";
import PostService from "../services/PostService";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setuser] = useState(null);
  const token = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");
  useEffect(() => {
    UserService.getUser(token)
      .then((res) => {
        setuser(res.data);
      })
      .catch((error) => {
        console.error("Error get User", error);
      });
  }, []);
  const [SendToMe, setSendToMe] = useState(false);
  useEffect(() => {
    const listenerID = "UNIQUE_LISTENER_ID";
    const handleTextMessageReceived = (message) => {
      setSendToMe(!SendToMe);
      console.log("Text message received:", JSON.stringify(message));
    };
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: handleTextMessageReceived,
      })
    );
    return () => {
      CometChat.removeMessageListener(listenerID);
    };
  }, [SendToMe]);

  const value = {
    user,
    SendToMe,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
export { UserContext, UserProvider };
