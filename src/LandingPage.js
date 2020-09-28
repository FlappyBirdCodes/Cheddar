import React from "react";
import "./App.css";
import "./styles/LandingPage.css";
import "./styles/NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Jumbotron, ListGroup } from "react-bootstrap";
import NavBar from "./components/NavBar";
import PostInput from "./components/postInput";
import SideBar from "./components/Sidebar";
import GetAllPosts from "./components/getAllPosts";
import Cookies from "universal-cookie";

function Introduction() {
  return (
    <Jumbotron id="intro">
      <h1>The Front Page of the Internet</h1>
      <p>
        Using the power of social media and the internet to connect voices and
        stories from around the world
      </p>
      <p>
        <a href="/signup">
          <Button variant="primary">Make an Account</Button>
        </a>
      </p>
    </Jumbotron>
  );
}

function Intro(props) {
  let postInput = null;
  if (!props.onLandingPage) {
    postInput = <PostInput rows="8" />;
  }

  return <div>{postInput}</div>;
}

function LandingPage() {
  const cookies = new Cookies();
  if (cookies.get("username")) {
    return (
      <div>
        <NavBar title="Home" loggedIn={false} />
        <div style={{ visibility: "hidden" }}>asdfasdf</div>
        <div id="flexCenter">
          <ListGroup id="posts">
            <Intro />
            <h2 id="header">Recommended For You</h2>
            <GetAllPosts subCheddar="all" />
          </ListGroup>
          <SideBar onLandingPage={true} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <NavBar title="Cheddar" loggedIn={true} />
        <Introduction />
        <div id="flexCenter">
          <ListGroup id="posts">
            <h2 id="header">Popular on Cheddar</h2>
            <GetAllPosts subCheddar="all" />
          </ListGroup>
          <SideBar onLandingPage={true} />
        </div>
      </div>
    );
  }
}

export default LandingPage;
