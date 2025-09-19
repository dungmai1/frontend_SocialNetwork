import "./App.css";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Hs from "./pages/Home/Hs.jsx";

import Profile from "./pages/Profile/Profile.jsx";
import NewsFeed from "./pages/NewsFeed/NewsFeed.jsx";
import Group from "./pages/Group/Group.jsx";
import Message from "./pages/Message/Message.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Search from "./pages/Search/Search.jsx";
import Error from "./pages/Error/Error.jsx";
import Saved from "./pages/Saved/Saved.jsx";
import checkAuth from "./Auth/checkAuth.js";
import { UserProvider } from "./context/UserContext.js";
import SocialThemeProvider from "./context/ThemeProvider.js";
import ScrollToTop from "./router/ScrollToTop.js";

import { UIKitSettingsBuilder } from "@cometchat/uikit-shared";
import {
  CometChatConversationsWithMessages,
  CometChatUIKit,
} from "@cometchat/chat-uikit-react";
import React, { useEffect, useState } from "react";
import SearchUser from "./pages/SearchUser/SearchUser.jsx";
import PostFollowing from "./pages/PostFollowing/PostFollowing.jsx";

const COMETCHAT_CONSTANTS = {
  APP_ID: "25887692c8a6c11f", //Replace with your App ID
  REGION: "us", //Replace with your App Region
  AUTH_KEY: "c8e0db36a10c54ad6391f8eaf4e8ea2daab5430b", //Replace with your Auth Key
};

//create the builder
const UIKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForAllUsers()
  .build();

//Initialize CometChat UIKit
CometChatUIKit.init(UIKitSettings)
  .then(() => {
    console.log("Initialization completed successfully");
  })
  .catch(console.log);

function App() {
  return (
    <SocialThemeProvider>
      <UserProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              element={checkAuth() ? <Home /> : <Navigate to="/login" />}
            >
              <Route path="/" element={<NewsFeed />} />
              <Route path="user/:username" element={<Profile />} />
              <Route path="group" element={<Group />} />
              <Route path="saved" element={<Saved />} />
              <Route path="postfollowing" element={<PostFollowing />} />
              <Route path="error" element={<Error />} />
              <Route path="search" element={<Search />} />
              <Route path="searchUser" element={<SearchUser />} />
            </Route>
            <Route
              path="message/:username"
              element={checkAuth() ? <Message /> : <Navigate to="/login" />}
            />
            <Route
              path="message"
              element={
                checkAuth() ? (
                  <Message />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="login"
              element={checkAuth() ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="register"
              element={checkAuth() ? <Navigate to="/" /> : <Register />}
            />
            <Route
              path="hs"
              element={
                checkAuth() ? (
                  <Hs/>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </Router>
      </UserProvider>
    </SocialThemeProvider>
  );
}
export default App;
