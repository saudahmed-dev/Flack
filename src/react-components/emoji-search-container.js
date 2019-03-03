import React from "react";

/* example usage:
  ****************************************************************
  Parent:

    <EmojiSearchContainer
      emojis={this.state.emojis}
      searching={this.state.searching}
      toggleEmojiSearch={this.toggleEmojiSearch}
      output="#inputPostForm"
    />

  constructor: 

    state:
    searching: false,
    emojis: {}
  this.toggleEmojiSearch = this.toggleEmojiSearch.bind(this);

  ***************************************************************** 
  Parent methods:

  componentDidMount(){
    Axios.get("https://api.github.com/emojis").then(data =>
      this.setState({
        emojis: data.data
      })
    );
  }
  toggleEmojiSearch() {
      this.setState({
        searching: !this.state.searching
      });
    }
  */

export default class EmojiSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: this.props.searching,
      urls: []
    };
    this.handleEmojiSearch = this.handleEmojiSearch.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.searching !== state.searching) {
      return {
        searching: props.searching,
        urls: []
      };
    }
    return null;
  }
  handleEmojiSearch(event) {
    const searchInput = event.target.value;
    if (searchInput.length >= 3) {
      let urls = Object.keys(this.props.emojis).filter(emoji =>
        emoji.includes(searchInput.trim())
      );
      this.setState({
        urls: urls.map(url => this.props.emojis[url])
      });
    } else {
      this.setState({
        urls: []
      });
    }
  }

  addEmojiToTextField(event) {
    let output = document.querySelector(this.props.output);
    var emoji = document.createElement("img");
    emoji.setAttribute("src", event.target.value);
    emoji.setAttribute("class", "emoji");
    output.appendChild(emoji);
  }

  render() {
    let emojiSearchButton = (
      <div className="emojiButton" onClick={this.props.toggleEmojiSearch}>
        <span className="fas fa-grin-stars" />
      </div>
    );
    let emojiSearchBar = (
      <input
        className="emojiSearch"
        placeholder="Search for an emoji!"
        onChange={this.handleEmojiSearch}
      />
    );
    let emojiPreview = this.state.urls.map(emoji => (
      <React.Fragment>
        <input
          type="image"
          alt="emoji"
          value={emoji}
          className="emoji"
          key={Object.keys(this.props.emojis).find(
            key => this.props.emojis[key] === emoji
          )}
          onClick={this.addEmojiToTextField.bind(this)}
          src={emoji}
        />
      </React.Fragment>
    ));

    let emojiSearchResults = (
      <div>{this.state.urls.length > 0 && emojiPreview}</div>
    );
    return (
      <React.Fragment>
        {emojiSearchButton}
        <div className="emojiSearchResults">
          {emojiSearchResults}
          {this.state.searching && emojiSearchBar}
        </div>
      </React.Fragment>
    );
  }
}
