import React from "react";
import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./Login";
import SignUp from "./SignUp";
import yourPosts from "./yourPosts";
import newPost from "./makeNewPost";
import viewPost from "./viewPost";
import myProfile from "./myProfile";
import subCheddar from "./subCheddar";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/yourPosts" component={yourPosts} />
        <Route exact path="/makeNewPost" component={newPost} />
        <Route exact path="/viewPost/:postID" component={viewPost} />
        <Route exact path="/myProfile" component={myProfile} />
        <Route exact path="/c/:subCheddar" component={subCheddar} />
        <Route exact path="/c/search/:search" component={subCheddar} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
