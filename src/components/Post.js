import React from "react";
import "../styles/LandingPage.css";
import "../styles/Post.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup } from "react-bootstrap";
import Cookies from "universal-cookie";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteStatus: null,
      image: null,
      upvoteStatus: true,
    };
    this.fetchUpvote = this.fetchUpvote.bind(this);
    this.upvote = this.upvote.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  fetchUpvote(increment) {
    fetch(
      "https://cheddar-heroku.herokuapp.com/upvoteRemoveUpvoteComment/" +
        increment,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentID: this.props.commentID,
        }),
      }
    ).then(() => {
      this.props.getComments(this.props.postID);
      setTimeout(() => {
        this.setState({ upvoteStatus: true });
      }, 300);
    });
  }

  fetchUpvoteForPost(increment) {
    fetch(
      "https://cheddar-heroku.herokuapp.com/upvoteRemoveUpvotePost/" +
        increment,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postID: this.props.postID,
        }),
      }
    ).then(() => {
      this.props.getPost(this.props.postID);
      setTimeout(() => {
        this.setState({ upvoteStatus: true });
      }, 1000);
    });
  }

  upvote() {
    this.setState({ upvoteStatus: false });

    const cookies = new Cookies();
    const username = cookies.get("username");

    if (this.props.onLandingPage === "true") {
      alert("You must be signed in to upvote a post.");
    } else {
      if (this.props.commentID) {
        if (this.props.upvoteStatus === "Upvote") {
          localStorage.setItem(
            "upvoteStatus-" + username + this.props.commentID,
            "Remove upvote"
          );
          this.fetchUpvote(1);
        } else {
          localStorage.setItem(
            "upvoteStatus-" + username + this.props.commentID,
            "Upvote"
          );
          this.fetchUpvote(-1);
        }
      } else {
        if (this.props.upvoteStatus === "Upvote") {
          localStorage.setItem(
            "postUpvoteStatus-" + username + this.props.postID,
            "Remove upvote"
          );
          this.fetchUpvoteForPost(1);
        } else {
          localStorage.setItem(
            "postUpvoteStatus-" + username + this.props.postID,
            "Upvote"
          );
          this.fetchUpvoteForPost(-1);
        }
      }
    }
  }

  deleteComment() {
    let confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmDelete === true) {
      //Fetches API to delete comment
      fetch("https://cheddar-heroku.herokuapp.com/deleteComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commentID: this.props.commentID,
          postID: this.props.postID,
        }),
      }).then(() => {
        //Rerenders all comments
        this.props.getComments(this.props.postID);
      });
    }
  }

  componentDidMount() {
    if (this.props.image && this.props.image.substring(0, 8) === "IsAVideo") {
      this.setState({ image: this.props.image.substring(8) });
    }
  }

  render() {
    let deleteStatus = null;
    const cookies = new Cookies();
    const username = cookies.get("username");
    if (this.props.username === username) {
      deleteStatus = (
        <p id="delete" className="blueLink" onClick={this.deleteComment}>
          delete
        </p>
      );
    }

    if (this.props.comment) {
      if (this.props.loggedIn) {
        return (
          <ListGroup.Item id="comment">
            <div>
              <a href={this.props.linkToPost} id="username">
                {this.props.username}
              </a>
              {deleteStatus}
              <p>{this.props.time}</p>
            </div>
            <p id="commentPost">{this.props.commentPost}</p>
            <div id="comments" className="noWrap">
              <p id="marginRight">{this.props.upvotes} upvotes</p>
              <p
                id="marginLeft"
                className="blueLink"
                onClick={() => {
                  if (this.state.upvoteStatus) {
                    this.upvote();
                  }
                }}
              >
                {this.props.upvoteStatus}
              </p>
            </div>
          </ListGroup.Item>
        );
      } else {
        return (
          <ListGroup.Item id="comment">
            <div>
              <a href={this.props.linkToPost} id="username">
                {this.props.username}
              </a>
              {deleteStatus}
              <p>{this.props.time}</p>
            </div>
            <p id="commentPost">{this.props.commentPost}</p>
            <div id="comments" className="noWrap">
              <p id="marginRight" style={{ marginLeft: "35px" }}>
                {this.props.upvotes} upvotes
              </p>
            </div>
          </ListGroup.Item>
        );
      }
    } else {
      return (
        <ListGroup.Item id="post" variant="light" className="post">
          <h4>
            <a href={this.props.linkToPost}>{this.props.title}</a>
          </h4>

          {this.props.image !== "null" &&
          this.props.image.substring(0, 8) !== "IsAVideo" ? (
            <img
              id="image"
              style={{ width: "550px", height: "425px" }}
              src={this.props.image}
              onError={() => {
                document
                  .getElementById("post")
                  .removeChild(document.getElementById("image"));
              }}
            ></img>
          ) : (
            ""
          )}

          {this.props.image.substring(0, 8) === "IsAVideo" ? (
            <iframe
              width="600"
              height="350"
              src={this.state.image}
              allowFullScreen
            ></iframe>
          ) : (
            ""
          )}

          <p
            id="bodyContent"
            style={{ whiteSpace: "pre-wrap", textAlign: "left" }}
          >
            {this.props.body}
          </p>

          <div className="noWrap">
            <p className="sameLine">{this.props.upvotes} upvotes</p>
            {this.props.onLarge ? null : (
              <p
                id="upvote"
                className="sameLine"
                onClick={() => {
                  if (this.state.upvoteStatus) {
                    this.upvote();
                  }
                }}
              >
                {this.props.upvoteStatus}
              </p>
            )}
          </div>

          <p id="submitInfo">
            Submitted a month ago by {this.props.poster} from
            <a href={this.props.subreddit}> {this.props.subreddit}</a>
          </p>
        </ListGroup.Item>
      );
    }
  }
}

export default Post;
