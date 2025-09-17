import { CometChatUsers, TitleAlignment } from "@cometchat/chat-uikit-react";

export default function UserCometChat() {
  return (
    <CometChatUsers
      title="Your Custom Title"
      showSectionHeader={true}
      tileAlignment={TitleAlignment.center}
    />
  );
}
