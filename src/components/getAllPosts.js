import React from "react";
import Post from "./Post";
import Cookies from "universal-cookie";
import { Spinner, Button } from "react-bootstrap";

class GetAllPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
      numberOfPosts: 15,
      morePosts: false,
    };
    this.LoadPosts = this.LoadPosts.bind(this);
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  componentDidMount() {
    let subCheddar = null;
    if (this.props.subCheddar === "popular") {
      subCheddar = "all";
    } else {
      subCheddar = this.props.subCheddar;
    }

    fetch("https://cheddar-heroku.herokuapp.com/getAllPosts/" + subCheddar)
      .then((response) => response.json())
      .then((response) => {
        //Displays posts
        this.setState({ loading: false });

        let posts = response["posts"];

        //Gets username to check if user is logged in
        const cookies = new Cookies();
        const username = cookies.get("username");

        let newPosts = [];
        for (let i = 0; i < posts.length; i++) {
          let currentPost = posts[i];

          //Checking if user is on landing page
          let onLandingPage = null;
          if (username) {
            onLandingPage = true;
          } else {
            onLandingPage = false;
          }

          currentPost.onLandingPage = onLandingPage;

          if (this.props.search) {
            if (
              currentPost.title
                .toLowerCase()
                .includes(this.props.search.toLowerCase())
            ) {
              newPosts.push(currentPost);
            }
          } else {
            newPosts.push(currentPost);
          }
        }
        this.shuffleArray(newPosts);
        this.setState({ posts: newPosts.slice(0, 300) });
      });
  }

  LoadPosts() {
    this.setState({ morePosts: true });
    let lastPageOffSet = window.pageYOffset;
    setTimeout(() => {
      this.setState({ numberOfPosts: this.state.numberOfPosts + 15 });
      window.scroll(0, lastPageOffSet);
      this.setState({ morePosts: false });
    }, 400);
  }

  render() {
    if (this.state.loading) {
      return (
        <div style={{ textAlign: "center" }}>
          <p>Loading...</p>
          <Spinner animation="border" />
        </div>
      );
    }

    return (
      <div>
        {this.state.posts
          .slice(0, this.state.numberOfPosts)
          .map(function (d, idx) {
            return (
              <Post
                onLandingPage={false}
                title={d.title}
                body={d.bodyPost.substring(0, 1000)}
                image={d.image_video}
                upvotes={d.upvotes}
                comments={d.numberOfComments}
                poster={d.username}
                subreddit={"/c/" + d.subCheddar}
                upvoteStatus={d.upvoteStatus}
                linkToPost={"/viewPost/" + d.postID}
                onLarge={true}
              />
            );
          })}

        {this.state.morePosts ? (
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            <p>Loading...</p>
            <Spinner animation="border" />
          </div>
        ) : (
          <Button
            variant="primary"
            type="submit"
            onClick={this.LoadPosts}
            style={{ padding: "7px 35px", marginBottom: "30px" }}
          >
            Load More Posts
          </Button>
        )}
      </div>
    );
  }
}

export default GetAllPosts;
