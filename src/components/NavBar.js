import React from "react";
import "../styles/NavBar.css";
import { Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import Cookies from "universal-cookie";

class NavBar extends React.Component {
  getRidOfCookie() {
    const cookies = new Cookies();
    cookies.remove("username", { path: "/" });
  }

  render() {
    const cookies = new Cookies();
    const username = cookies.get("username");

    if (this.props.emptyNav) {
      return (
        <nav>
          <a id="title" href="/">
            Cheddar
          </a>
        </nav>
      );
    }

    let navRight = null;
    if (this.props.loggedIn) {
      navRight = (
        <div className="userEntry">
          <a href="/login" className="button">
            <Button variant="primary">Log In</Button>
          </a>
          <a href="/signup" className="button">
            <Button variant="primary">Sign Up</Button>
          </a>
        </div>
      );
    } else {
      navRight = (
        <div className="userEntry">
          <DropdownButton id="dropdown-basic-button" title={username}>
            <Dropdown.Item href="/">Home</Dropdown.Item>
            <Dropdown.Item href="/myProfile">My Profile</Dropdown.Item>
            <Dropdown.Item href="/makeNewPost">Make New Post</Dropdown.Item>
            <Dropdown.Item href="/yourPosts">Your Posts</Dropdown.Item>
            <Dropdown.Item href="/login" onClick={this.getRidOfCookie}>
              Log Out
            </Dropdown.Item>
          </DropdownButton>
        </div>
      );
    }

    return (
      <nav>
        <a id="title" href="/">
          {this.props.title}
        </a>

        <Form
          id="searchEngine"
          onSubmit={(e) => {
            e.preventDefault();
            window.location =
              "/c/search/" + document.getElementById("search").value;
          }}
        >
          <Form.Group>
            <Form.Control
              id="search"
              type="text"
              placeholder="Search"
              required
            />
          </Form.Group>
        </Form>
        {navRight}
      </nav>
    );
  }
}

export default NavBar;
