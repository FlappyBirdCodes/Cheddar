import React from "react";
import NavBar from "./components/NavBar";
import Post from "./components/Post";
import SideBar from "./components/Sidebar";
import PostComment from "./components/postComment";
import { ListGroup, Spinner } from "react-bootstrap";
import "./styles/LandingPage.css";
import Cookies from "universal-cookie";

class viewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
      onLandingPage: null,
      post: (
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <p>Loading...</p>
          <Spinner animation="border" />
        </div>
      ),
      postID: null,
      comments: [],
      subCheddar: null,
      sidebarDescription: null,
    };
    this.getPost = this.getPost.bind(this);
    this.getComments = this.getComments.bind(this);
  }

  getPost(postID) {
    //Fetching to get the post
    fetch("https://cheddar-heroku.herokuapp.com/viewPost/" + postID)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ postID: response.postID });

        const cookies = new Cookies();
        const username = cookies.get("username");

        //Assigning upvote status to upvote if status has not been set
        let upvoteStatus = localStorage.getItem(
          "postUpvoteStatus-" + username + postID
        );
        if (upvoteStatus === null) {
          upvoteStatus = "Upvote";
        }

        let onLarge = true;
        if (username) {
          onLarge = false;
        }

        let descriptions = {
          popular:
            "A SubCheddar dedicated to the trending aspects of the internet",
          stories:
            "A place where you can share stories with your fellow human beings",
          memes: "Who doesn't like memes am I right boys?",
          videoGames: "Cool games and stuff",
          movies: "If it's anything to do with movies, we got you covered",
          secrets: "Expose your secrets online for the whole word to see",
          politics:
            "Whether you're a democrat or conservative, all are welcome",
          sports: "Sports news and highlights from around the world",
          videos:
            "Wanna see a bunch of random videos? You've come to the right place",
        };

        let description = descriptions[response.subCheddar];
        this.setState({ sidebarDescription: description });
        console.log(this.state.sidebarDescription);

        this.setState({ subCheddar: "/c/" + response.subCheddar });

        //Defines component for post
        const post = (
          <Post
            onLandingPage={this.state.loggedIn}
            title={response.title}
            body={response.bodyPost}
            image={response.image_video}
            upvotes={response.upvotes}
            comments={response.numberOfComments}
            poster={response.username}
            subreddit={"/c/" + response.subCheddar}
            upvoteStatus="Upvote"
            getPost={this.getPost}
            postID={postID}
            upvoteStatus={upvoteStatus}
            onLarge={onLarge}
          />
        );

        //Displays post after a slight delay
        setTimeout(() => this.setState({ post: post }), 400);
      });
  }

  getComments(postID) {
    let comments = [];

    //Fetching to get all comments for post
    fetch("https://cheddar-heroku.herokuapp.com/getComments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postID: postID,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        //Reverses comments so that newer comments are first in the array
        response.comments = response.comments.reverse();

        //Gets the current username
        const cookies = new Cookies();
        const username = cookies.get("username");

        //Loops through all comments
        for (let i = 0; i < response.comments.length; i++) {
          const commentData = response.comments[i];

          let upvoteStatus = localStorage.getItem(
            "upvoteStatus-" + username + commentData.commentID
          );
          if (upvoteStatus === null) {
            upvoteStatus = "Upvote";
          }

          //Defines component for each comment
          const comment = (
            <Post
              username={commentData.commenter}
              commentPost={commentData.comment}
              time={commentData.time}
              upvotes={commentData.upvotes}
              comment={true}
              loggedIn={this.state.loggedIn}
              postID={commentData.postID}
              commentID={commentData.commentID}
              getComments={this.getComments}
              upvoteStatus={upvoteStatus}
            />
          );

          comments.push(comment);
        }
        this.setState({ comments: comments });
      });
  }

  componentDidMount() {
    //Getting username
    const cookies = new Cookies();
    const username = cookies.get("username");

    if (username) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
      this.setState({ onLandingPage: "true" });
    }

    //Getting posts and comments with postID
    const postID = this.props.match.params.postID;
    this.getPost(postID);
    this.getComments(postID);
  }

  render() {
    return (
      <div>
        <NavBar title="Home" loggedIn={!this.state.loggedIn} />
        <div style={{ visibility: "hidden" }}>asdfasdf</div>
        <div id="flexCenter">
          <div id="posts">
            <ListGroup>
              {this.state.post}
              {this.state.testing}
              <PostComment
                loggedIn={this.state.loggedIn}
                postID={this.state.postID}
                getComments={this.getComments}
              />
            </ListGroup>

            {this.state.comments.map(function (d, idx) {
              return <div>{d}</div>;
            })}
          </div>
          <SideBar
            description={this.state.sidebarDescription}
            subCheddar={this.state.subCheddar}
          />
        </div>
      </div>
    );
  }
}

export default viewPost;
