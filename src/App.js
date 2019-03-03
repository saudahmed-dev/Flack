import React, { Component } from "react";
import "./App.css";

import Message from "./react-components/message.js";
import EmojiSearchContainer from "./react-components/emoji-search-container";
import Axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      emojis: {},
      posts: [],
      searching: false
    };
    this.createPost = this.createPost.bind(this);
    this.deleteUnusedPosts = this.deleteUnusedPosts.bind(this);
    this.toggleEmojiSearch = this.toggleEmojiSearch.bind(this);
    this.inputPostForm = React.createRef();
    this.createPostButton = React.createRef();
    this.messages = React.createRef();
  }
  componentDidMount() {
    const postButton = this.createPostButton.current;
    this.inputPostForm.current.addEventListener("keydown", function(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        postButton.click();
      }
    });
    Axios.get("https://api.github.com/emojis").then(data =>
      this.setState({
        emojis: data.data
      })
    );
  }
  createPost() {
    let userInput = this.inputPostForm.current.innerHTML;
    let timePosted = new Date().toLocaleTimeString();
    if (userInput !== "") {
      this.setState({
        count: this.state.count + 1
      });
      let newPost = (
        <Message
          key={"message-" + this.state.count}
          id={"message-" + this.state.count}
          input={userInput}
          timePosted={timePosted}
          emojis={this.state.emojis}
        />
      );
      this.setState({
        posts: [...this.state.posts, newPost],
        searching: false
      });
      this.inputPostForm.current.innerText = "";
      let element = this.messages.current;
      element.scrollTop = element.scrollHeight;

      this.deleteUnusedPosts();
    }
  }

  toggleEmojiSearch() {
    console.log("action fired");
    this.setState({
      searching: !this.state.searching
    });
  }

  componentDidUpdate() {}

  deleteUnusedPosts() {
    setTimeout(
      function() {
        this.setState({
          posts: this.state.posts.filter(post =>
            document.querySelector("#" + post.props.id)
          )
        });
      }.bind(this),
      100
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">Hello world!</header>
          <div className="appBody">
            <div className="contacts">Contact Section</div>
            <div className="messageSection">
              <div id="messages" ref={this.messages}>
                {this.state.posts}
              </div>
              <div id="inputForm">
                <div
                  contentEditable="true"
                  id="inputPostForm"
                  ref={this.inputPostForm}
                />
                <div className="sendButton">
                  <span
                    className="fa fa-paper-plane-o "
                    id="createPostButton"
                    ref={this.createPostButton}
                    onClick={this.createPost}
                  />
                </div>
                <EmojiSearchContainer
                  emojis={this.state.emojis}
                  searching={this.state.searching}
                  toggleEmojiSearch={this.toggleEmojiSearch}
                  output="#inputPostForm"
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
