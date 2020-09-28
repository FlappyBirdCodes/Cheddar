import React from "react";
import NavBar from "./components/NavBar";
import { Card, Button, Spinner } from "react-bootstrap";
import "./styles/LandingPage.css";
import Cookies from "universal-cookie";

class yourPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      loading: true,
      posts: [],
    };
  }

  splitPostsIntoLines(posts) {
    let items = posts.reverse();

    //Assigns an id to each post
    for (let i = 0; i < items.length; i++) {
      items[i]["id"] = i;
    }

    //Splits the posts into arrays of size 3
    items = new Array(Math.ceil(items.length / 3))
      .fill()
      .map((_) => items.splice(0, 3));

    let allPosts = [];
    //Takes the data and passes it through to html
    for (let i = 0; i < items.length; i++) {
      let posts = items[i].map((post) => {
        console.log(String(post.postID).substring(0, 8));
        if (String(post.postID).substring(0, 9) !== "/viewPost") {
          post.postID = "viewPost/" + post.postID;
        }
      });

      let id = "image-" + i;
      let frame = "frame-" + i;
      posts = items[i].map((post) => (
        <Card
          style={{
            width: "19rem",
            margin: "10px",
          }}
        >
          <Card.Body>
            <Card.Title>
              <a href={post.postID}>{post.title.substring(0, 50)}</a>
            </Card.Title>
            <Card.Text>SubCheddar: /c/{post.subCheddar}</Card.Text>
            {post.image_video === "null" ||
            post.image_video.substring(0, 8) === "IsAVideo" ? null : (
              <Card.Img
                id={id}
                variant="top"
                src={post.image_video}
                onError={() => {
                  document.getElementById(id).remove();
                }}
              />
            )}
            {post.image_video.substring(0, 8) === "IsAVideo" ? (
              <iframe
                id={frame}
                width="262"
                height="155"
                src={post.image_video.substring(8)}
                allowFullScreen
              ></iframe>
            ) : null}
            <Card.Text>{post.bodyPost.substring(0, 390)}</Card.Text>
          </Card.Body>
          <div style={{ height: "3rem" }}>
            <Button
              variant="primary"
              style={{ width: "42%", float: "left", marginLeft: "18px" }}
              onClick={() => (window.location = post.postID)}
            >
              View Post
            </Button>
            <Button
              variant="danger"
              onClick={() => this.deletePost(post.id)}
              style={{ width: "42%", float: "right", marginRight: "18px" }}
            >
              Delete Post
            </Button>
          </div>
        </Card>
      ));
      posts = <div id="flexCenter">{posts}</div>;
      allPosts.push(posts);
    }
    this.setState({ posts: allPosts });
  }

  componentDidMount() {
    const cookies = new Cookies();
    const username = cookies.get("username");
    this.setState({ username: username });

    fetch("https://cheddar-heroku.herokuapp.com/getPosts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setTimeout(() => this.setState({ loading: false }), 500);
        console.log(response);

        this.splitPostsIntoLines(response);
      });
  }

  deletePost(id) {
    let confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmDelete === true) {
      fetch("https://cheddar-heroku.herokuapp.com/deletePost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.state.username,
          id: id,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          this.splitPostsIntoLines(response);
        });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <NavBar title="Home" />
          <h4 style={{ visibility: "hidden" }}>asdfasdf</h4>
          <div style={{ textAlign: "center", margin: "0 auto" }}>
            <p>Loading...</p>
            <Spinner animation="border" />
          </div>
        </div>
      );
    }

    if (this.state.posts.length !== 0) {
      return (
        <div>
          <NavBar title="Home" />
          <div style={{ marginTop: "35px", marginBottom: "25px" }}>
            {this.state.posts.map(function (d, idx) {
              return <div key={idx}>{d}</div>;
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <NavBar title="Home" />
          <div style={{ textAlign: "center" }}>
            <h2 style={{ textAlign: "center", marginTop: "35px" }}>
              You have no posts currently.
            </h2>
          </div>
        </div>
      );
    }
  }
}

export default yourPosts;
