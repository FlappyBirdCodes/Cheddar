import React from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import "./styles/Login.css";
import NavBar from "./components/NavBar";
import Input from "./components/Input";
import Cookies from "universal-cookie";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
    };
    this.login = this.login.bind(this);
    this.LoginForm = this.LoginForm.bind(this);
  }

  async login(e) {
    e.preventDefault();

    this.setState({ spinner: true });
    let username = document.getElementById("Username").value;
    let password = document.getElementById("Password").value;
    await fetch(
      "https://cheddar-heroku.herokuapp.com/login/" + username + "/" + password
    )
      .then((response) => response.text())
      .then((response) => {
        if (response === "Login successful") {
          const cookies = new Cookies();
          const current = new Date();
          const nextYear = new Date();

          nextYear.setFullYear(current.getFullYear() + 1);

          cookies.set("username", username, {
            path: "/",
            expires: nextYear,
          });

          setTimeout(() => {
            this.setState({ spinner: false });
            this.props.history.push("/");
          }, 500);
        } else {
          this.setState({ spinner: false });
          alert("Incorrect username or password");
        }
      });
  }

  LoginForm() {
    let loading = null;
    if (this.state.spinner) {
      loading = (
        <div style={{ textAlign: "center" }}>
          <p>Loading...</p>
          <Spinner animation="border" />
        </div>
      );
    } else {
      loading = null;
    }

    return (
      <div>
        <Form id="loginForm" onSubmit={this.login}>
          <h2 style={{ fontFamily: "inherit" }}>Log In</h2>
          <Input
            label="Username"
            type="username"
            placeholder="Enter username"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
          />
          <Button type="submit" variant="success" id="login">
            Log In
          </Button>{" "}
        </Form>
        <p style={{ textAlign: "center", marginTop: "6px" }}>
          Don't have an account? <a href="/signup">Sign up</a>.
        </p>
        {loading}
      </div>
    );
  }

  render() {
    return (
      <div>
        <NavBar emptyNav={true} />
        <this.LoginForm />
      </div>
    );
  }
}

export default Login;
