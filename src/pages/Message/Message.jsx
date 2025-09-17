import React, { useContext, useEffect, useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import "../Message/Message.css";

import { CometChat } from "@cometchat/chat-sdk-javascript";
import {
  BadgeStyle,
  CometChatBadge,
  CometChatConversations,
  CometChatConversationsWithMessages,
  CometChatMessages,
  CometChatThemeContext,
  CometChatUsers,
  CometChatUsersWithMessages,
  ConversationsConfiguration,
  ConversationsStyle,
  ListItemStyle,
} from "@cometchat/chat-uikit-react";
import { useNavigate, useParams } from "react-router-dom";
export default function Message() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [load, setload] = useState(false);

  useEffect(() => {
    if (username) {
      const getUser = async () => {
        const user = await CometChat.getUser(username);
        setUser(user);
      };
      getUser();
    }
  }, [load]);
  const handleOnItemClick = (item) => {
    navigate(`/message/${item.conversationWith.uid}`);
    setload(!load);
    // CometChat.getUser(item.conversationWith.uid).then((user) => {
    //   setUser(user)
    // })
  };
  return (
    <>
      <Topbar />
      <div
        style={{
          marginTop: "75px",
        }}
      >
        <div
          className="conversations"
          style={{ width: "100%", height: "100%" }}
        >
          <>
            <div style={{ display: "flex" }}>
              <div style={{ width: "20%" }}>
                <CometChatConversations onItemClick={handleOnItemClick} />
              </div>
              <div style={{ width: "80%", overflow: "auto", height: "620px" }}>
                {user ? <CometChatMessages user={user} /> : <></>}
              </div>
            </div>
          </>
        </div>
      </div>
      </>
  );
}
