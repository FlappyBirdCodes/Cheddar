import React from "react";
import { Form, Button, ListGroup, Spinner } from "react-bootstrap";
import Cookies from "universal-cookie";

class PostComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: null,
    };
    this.createComment = this.createComment.bind(this);
  }

  getCurrentTime() {
    let now = new Date();
    now.setHours(now.getHours());
    now = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    if (now[0] === "0") {
      now = now.slice(1);
    }
    return now;
  }

  getCurrentDate() {
    const utc = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
    return utc;
  }

  createComment(e) {
    e.preventDefault();

    //Gets commenter's username
    const cookies = new Cookies();
    const username = cookies.get("username");

    //Starting the spinner
    this.setState({
      spinner: (
        <div style={{ textAlign: "center" }}>
          <p>Loading...</p>
          <Spinner animation="border" />
        </div>
      ),
    });

    //Defines commentID and comment value
    let uniqID = Date.now();
    const comment = document.getElementById("comment").value;

    if (comment.replace(/\s/g, "").length === 0) {
      alert("Your comment cannot be empty.");
      this.setState({ spinner: null });
    } else {
      //Fetches API to add comment to post
      fetch("https://cheddar-heroku.herokuapp.com/addComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentID: uniqID,
          postID: this.props.postID,
          commenter: username,
          comment: comment,
          time: this.getCurrentTime() + ", " + this.getCurrentDate(),
          upvotes: 0,
        }),
      }).then(() => {
        //Setting local storage variable to store upvote status of comment
        localStorage.setItem("upvoteStatus-" + username + uniqID, "Upvote");

        //Stops spinner after a slight delay, recalls all comments
        setTimeout(() => {
          this.setState({ spinner: null });
          this.props.getComments(this.props.postID);
          document.getElementById("comment").value = "";
        }, 800);
      });
    }
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <Form onSubmit={this.createComment}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              id="comment"
              style={{ resize: "none" }}
              as="textarea"
              rows="5"
              placeholder="What are your thoughts on this post?"
            />
          </Form.Group>
          <Button
            id="postComment"
            type="submit"
            variant="success"
            style={{
              float: "right",
              paddingLeft: "15px",
              paddingRight: "15px",
            }}
          >
            Comment
          </Button>{" "}
          <br></br>
          <br></br>
          {this.state.spinner}
        </Form>
      );
    } else {
      return (
        <ListGroup>
          <ListGroup.Item>
            <p style={{ marginBottom: "0px" }}>
              <a href="/login">Log in</a> or <a href="/signUp">sign up</a> to
              leave a comment.
            </p>
          </ListGroup.Item>
        </ListGroup>
      );
    }
  }
}

export default PostComment;
