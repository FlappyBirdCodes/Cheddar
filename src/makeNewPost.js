import React from "react";
import NavBar from "./components/NavBar";
import PostInput from "./components/postInput";
import SideBar from "./components/Sidebar";
import "./styles/LandingPage.css";

class newPost extends React.Component {
  render() {
    return (
      <div>
        <NavBar title="Home" />
        <div id="flexCenter" style={{ marginTop: "40px" }}>
          <div id="posts">
            <h2 id="header">Make a New Post</h2>
            <PostInput rows="12" />
          </div>
          <SideBar onLandingPage={true} />
        </div>
      </div>
    );
  }
}

export default newPost;
