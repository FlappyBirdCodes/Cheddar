import React from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import "./styles/Login.css";
import NavBar from "./components/NavBar";
import Input from "./components/Input";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
    };
    this.signUp = this.signUp.bind(this);
    this.SignUpForm = this.SignUpForm.bind(this);
  }

  async signUp(e) {
    e.preventDefault();

    let username = document.getElementById("Username").value;
    let password = document.getElementById("Password").value;
    let confirmPassword = document.getElementById("Confirm password").value;

    this.setState({ spinner: true });
    await fetch(
      "https://cheddar-heroku.herokuapp.com/makeNewAccount/" +
        username +
        "/" +
        password +
        "/" +
        confirmPassword
    )
      .then((response) => response.text())
      .then((response) => {
        if (response === "Your account has been successfully created.") {
          alert(response);
          this.props.history.push("/login");
        } else {
          this.setState({ spinner: false });
          alert(response);
        }
      });
  }

  SignUpForm() {
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
        <Form id="loginForm" onSubmit={this.signUp}>
          <h2 style={{ fontFamily: "inherit" }}>Sign Up</h2>
          <Input
            label="Username"
            type="username"
            placeholder="Enter username"
          />
          <Input label="Password" type="text" placeholder="Enter password" />
          <Input
            label="Confirm password"
            type="text"
            placeholder="Confirm password"
          />
          <Button type="submit" variant="success" id="login">
            Sign Up
          </Button>
        </Form>
        <p style={{ textAlign: "center", marginTop: "6px" }}>
          Already have an account? <a href="/login">Log in</a>.
        </p>
        {loading}
      </div>
    );
  }

  render() {
    return (
      <div>
        <NavBar emptyNav={true} />
        <this.SignUpForm />
      </div>
    );
  }
}

export default SignUp;
