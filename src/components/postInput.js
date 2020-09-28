import React from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import Cookies from "universal-cookie";
import isImageUrl from "is-image-url";

class PostInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this.makeNewPost = this.makeNewPost.bind(this);
  }

  getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  }

  async makeNewPost(e) {
    e.preventDefault();

    const cookies = new Cookies();
    const username = cookies.get("username");
    const original_subcheddar = document.getElementById("subcheddar").value;
    const subcheddar = original_subcheddar.substring(
      3,
      original_subcheddar.length
    );
    const title = document.getElementById("postTitle").value;
    let image_video = document.getElementById("image_video").value;
    const bodyPost = document.getElementById("post").value;

    if (!isImageUrl(image_video)) {
      image_video = "IsAVideo" + image_video;
    }

    image_video = "IsAVideo//www.youtube.com/embed/" + this.getId(image_video);
    console.log(this.getId(image_video));

    if (image_video.length === 0 || this.getId(image_video) === null) {
      image_video = "null";
    }

    this.setState({ redirect: true });

    //Checks if you have chosen a subcheddar
    if (original_subcheddar === "Choose a SubCheddar") {
      alert("You must choose a subCheddar to make your post in.");
      this.setState({ redirect: false });
    } else {
      //Sends fetch to api in order to add a post
      await fetch("https://cheddar-heroku.herokuapp.com/addPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          title: title,
          subCheddar: subcheddar,
          image_video: image_video,
          bodyPost: bodyPost,
        }),
      }).then((response) => {
        //Redirects to yourPosts after post has been added
        window.location = "/yourPosts";
      });
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.makeNewPost}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control as="select" id="subcheddar" className="postInput">
              <option>Choose a SubCheddar</option>
              <option>/c/memes</option>
              <option>/c/stories</option>
              <option>/c/videos</option>
              <option>/c/videoGames</option>
              <option>/c/movies</option>
              <option>/c/secrets</option>
              <option>/c/politics</option>
              <option>/c/sports</option>
            </Form.Control>
            <Form.Control
              id="postTitle"
              className="postInput"
              placeholder="Title"
              required
            />
            <Form.Control
              id="image_video"
              className="postInput"
              placeholder="Image or YouTube Url (Optional)"
            />
            <Form.Control
              id="post"
              className="postInput"
              as="textarea"
              placeholder="What's on your mind today? (Optional)"
              rows={this.props.rows}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{ padding: "7px 35px", marginBottom: "15px" }}
          >
            Post to SubCheddar
          </Button>{" "}
        </Form>
        {this.state.redirect ? (
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            <p>Loading...</p>
            <Spinner animation="border" />
          </div>
        ) : (
          <div style={{ marginTop: "25px" }}></div>
        )}
      </div>
    );
  }
}

export default PostInput;
