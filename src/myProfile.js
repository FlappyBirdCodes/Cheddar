import React from "react";
import NavBar from "./components/NavBar";
import { Col, Image, Button, Form } from "react-bootstrap";
import "./styles/myProfile.css";

class myProfile extends React.Component {
  render() {
    return (
      <div>
        <NavBar title="Home" loggedIn={false} />

        <div id="border">
          <div id="myProfile">
            <Col id="colImage">
              <Image
                id="profilePicture"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg"
                roundedCircle
              />
            </Col>
            <div id="profileInfo">
              <p className="label">Username: </p>
              <Form.Control
                className="profileInput"
                type="text"
                value="324redditmonster"
                disabled
              />
              <p className="label">Password: </p>
              <Form.Control
                className="profileInput"
                type="text"
                value="1234hitthemhardbruh"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default myProfile;
