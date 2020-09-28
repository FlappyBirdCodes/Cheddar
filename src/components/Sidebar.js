import React from "react";
import { ListGroup } from "react-bootstrap";
import "../styles/LandingPage.css";

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popularPosts: [],
    };
    this.PopularPosts = this.PopularPosts.bind(this);
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  componentDidMount() {
    fetch("https://cheddar-heroku.herokuapp.com/getAllPosts/all")
      .then((response) => response.json())
      .then((response) => {
        this.shuffleArray(response.posts);
        let popularPosts = response.posts.slice(0, 6);
        for (let i = 0; i < popularPosts.length; i++) {
          popularPosts[i].postID = "/viewPost/" + popularPosts[i].postID;
        }
        this.setState({ popularPosts: popularPosts });
      });
  }

  PopularPosts(props) {
    return (
      <div>
        <h5 style={{ marginTop: "25px" }}>{props.adjective}</h5>
        <ListGroup id="subreddits">
          {this.state.popularPosts.map(function (d, idx) {
            return (
              <a href={d.postID} className="question" key={idx}>
                {d.title}
              </a>
            );
          })}
        </ListGroup>
      </div>
    );
  }

  SubCheddar(props) {
    return (
      <div>
        <ListGroup id="subreddits">
          <h5>
            <a href={props.subCheddar}>{props.subCheddar}</a>
          </h5>
          <ListGroup.Item>
            <p>{props.description}</p>
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }

  render() {
    if (this.props.popularSubreddits) {
      return (
        <div>
          <this.SubCheddar description={this.props.description} />
          <PopularSubreddits />
          <this.PopularPosts adjective="Recommended For You" />
        </div>
      );
    } else if (this.props.onLandingPage) {
      return (
        <div>
          <PopularSubreddits />
          <this.PopularPosts adjective="Popular Posts" />
        </div>
      );
    } else {
      return (
        <div>
          <this.SubCheddar
            description={this.props.description}
            subCheddar={this.props.subCheddar}
          />
          <this.PopularPosts adjective="Recommended For You" />
        </div>
      );
    }
  }
}

function PopularSubreddits() {
  return (
    <div style={{ marginTop: "25px" }}>
      <ListGroup id="subreddits">
        <h5>SubCheddars</h5>
        <div style={{ height: "300px", overflowY: "scroll" }}>
          <ListGroup.Item>
            <a href="/c/popular">/c/popular</a>
          </ListGroup.Item>
          <ListGroup.Item>
            <a href="/c/memes">/c/memes</a>
          </ListGroup.Item>
          <ListGroup.Item>
            <a href="/c/stories">/c/stories</a>
          </ListGroup.Item>
          <ListGroup.Item>
            <a href="/c/videos">/c/videos</a>
          </ListGroup.Item>
          <ListGroup.Item>
            <a href="/c/videoGames">/c/videoGames</a>
          </ListGroup.Item>
          <ListGroup.Item>
            <a href="/c/movies">/c/movies</a>
          </ListGroup.Item>
          <ListGroup.Item>
            <a href="/c/secrets">/c/secrets</a>
          </ListGroup.Item>
          <ListGroup.Item>
            <a href="/c/politics">/c/politics</a>
          </ListGroup.Item>
          <ListGroup.Item>
            <a href="/c/sports">/c/sports</a>
          </ListGroup.Item>
        </div>
      </ListGroup>
    </div>
  );
}

export default SideBar;
