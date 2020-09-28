import React from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/Sidebar";
import Cookies from "universal-cookie";
import GetAllPosts from "./components/getAllPosts";

class subCheddar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDescription: null,
    };
  }

  componentDidMount() {
    let descriptions = {
      popular: "A SubCheddar dedicated to the trending aspects of the internet",
      stories:
        "A place where you can share stories with your fellow human beings",
      memes: "Who doesn't like memes am I right boys?",
      videoGames: "Cool games and stuff",
      movies: "If it's anything to do with movies, we got you covered",
      secrets: "Expose your secrets online for the whole word to see",
      politics: "Whether you're a democrat or conservative, all are welcome",
      sports: "Sports news and highlights from around the world",
      videos:
        "Wanna see a bunch of random videos? You've come to the right place",
    };

    let description = descriptions[this.props.match.params.subCheddar];
    this.setState({ sidebarDescription: description });
  }

  render() {
    const cookies = new Cookies();
    const username = cookies.get("username");
    let loggedIn = true;
    if (username) {
      loggedIn = false;
    }

    return (
      <div>
        <NavBar title="Home" loggedIn={loggedIn} />
        <div style={{ visibility: "hidden" }}>asdfasdf</div>
        <div id="flexCenter" style={{ marginTop: "15px" }}>
          <div id="posts">
            {this.props.match.params.subCheddar ? (
              <div>
                <h2 id="header">/c/{this.props.match.params.subCheddar}</h2>
                <GetAllPosts subCheddar={this.props.match.params.subCheddar} />
              </div>
            ) : (
              <div>
                <h2 id="header">Search: {this.props.match.params.search}</h2>
                <GetAllPosts
                  subCheddar="all"
                  search={this.props.match.params.search}
                />
              </div>
            )}
          </div>
          {this.props.match.params.subCheddar ? (
            <div>
              <SideBar
                popularSubreddits={true}
                description={this.state.sidebarDescription}
              />
            </div>
          ) : (
            <div>
              <SideBar
                onLandingPage={true}
                description={this.state.sidebarDescription}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default subCheddar;
